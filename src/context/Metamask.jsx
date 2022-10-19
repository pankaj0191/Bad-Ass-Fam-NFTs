import React, { useState, useEffect, useContext } from 'react'
import Web3Modal from 'web3modal'
import { ethers } from 'ethers'
import { useNavigate } from "react-router-dom";
import { ToastContainer, Toast } from 'react-bootstrap';

import { useLocalStorage, useStateCallback } from '../components/miscellaneous/hooks';
import { NETWORKCHAINS, RPC_ENDPOINT, WALLET_PRIVATE_KEY } from '../../utils';

// Export metamask context api
export const MetamaskContext = React.createContext();


export const getPrivateContract = async (address, abi) => {
    try {
        if(!address || !abi) return false;

        const provider = new ethers.providers.JsonRpcProvider(RPC_ENDPOINT);
        const providerContract =  new ethers.Contract(address, abi, provider);
        
        const wallet = new ethers.Wallet(WALLET_PRIVATE_KEY);
        const providerWallet = wallet.connect(provider)
        return providerContract.connect(providerWallet);
    } catch (error) {
        console.log(error)
        return false;
    }
}

export const getContract = async (address, abi) => {
    try {
        if (!address || !abi || typeof ethereum == 'undefined') return false;

        const account = ethereum.selectedAddress;

        if (account) {
            const provider = await getWeb3Provider();
            //sign the transaction
            const signer = provider.getSigner();
            return new ethers.Contract(address, abi, signer);
        }
    } catch (error) {
        console.log(error)
    }
    return false;

}

export const getWeb3Provider = async () => {
    const web3Modal = new Web3Modal();
    const connection = await web3Modal.connect();
    return new ethers.providers.Web3Provider(connection);
}

export const MetamaskProvider = ({ children }) => {
    const [userData, setUserData] = useLocalStorage('user', '');
    const [isConnected, setIsConnected] = useState(false);
    const [alerts, setAlerts] = useStateCallback([], (alert, newAlert, action) => {
        var newAlerts = newAlert;
        if (!action.stateAction) {
            newAlerts = alert.filter((i) => {
                let alertTitle = i.title.trim().toLowerCase();
                let mainTitle = newAlert.title.trim().toLowerCase();
                return alertTitle !== mainTitle;
            });
            newAlerts.push(newAlert);
        }
        return newAlerts;
    });
    const userAddress = userData.address || '';

    let navigate = useNavigate();

    const NETWORK_CHAIN = import.meta.env.VITE_NETWORK_CHAIN;

    useEffect(() => {
        checkIsWalletConnected();
    }, [userAddress, isConnected]);

    const logout = async () => {
        setAlerts({
            title: 'You are logged out!',
            variant: 'warning',
            time: new Date(),
            message: `You are disconnected to ${userAddress} address`,
            autoRemove: true
        });
        await setUserData('');
        navigate(`/`);
    }

    const removeAlert = (object) => {
        if (typeof object === 'object') {
            let newAlerts = alerts.filter((alert) => alert.title !== object.title);
            setAlerts(newAlerts, "all");
        }
    }

    const autoRemoveAlert = (alert) => {
        setTimeout(() => {
            removeAlert(alert)
        }, 5000);
    }

    const login = async () => {
        try {
            const isEthereum = window.ethereum || false;
            if (!isEthereum) {
                setAlerts({
                    title: 'Metamask is not installed!',
                    variant: 'danger',
                    time: new Date(),
                    message: 'Please install metamask on your browser!',
                    autoRemove: true
                });
                return false;
            }

            const isChainMatched = await checkCurrentChain();
            if(!isChainMatched.status) {
                setAlerts({
                    title: 'Incorrect Network chain!',
                    variant: 'danger',
                    time: new Date(),
                    message: `Please select the ${isChainMatched.data.name}`,
                    autoRemove: false
                });
                return false;
            }

            let account = ethereum.selectedAddress;

            if (!account || account.trim()) {
                account = await ethereum.request({ method: 'eth_requestAccounts' })
                    .then((accounts) => accounts[0])
                    .catch((err) => {
                        console.log(err)
                        if (err.code == "-32002") {
                            setAlerts({
                                title: 'Pending Request!',
                                variant: 'info',
                                time: new Date(),
                                message: `'wallet_requestPermissions' already pending`,
                                autoRemove: false
                            });
                        }
                        return false;
                    });
            }
            if (account) {
                await setUserData({
                    address: account
                })
                setAlerts({
                    title: 'You are logged in!',
                    variant: 'info',
                    time: new Date(),
                    message: `You are connected to ${account} address`,
                    autoRemove: true
                });
            } else {
                console.log('No account found');
                setUserData('');
            }
        } catch (error) {
            setAlerts({
                title: 'Permission denied!',
                variant: 'error',
                time: new Date(),
                message: error.message,
                autoRemove: false
            });
            setUserData('');
        }
    }

    const checkIsWalletConnected = async () => {
        try {
            const isEthereum = window.ethereum || false;
            if (!isEthereum) {
                return false;
            }
            const isChainMatched = await checkCurrentChain();
            if(!isChainMatched.status) { 
                setUserData('');
                return false
             };

            const account = ethereum.selectedAddress;

            if (!account) {
                console.log('No Account Found')
                setIsConnected(false);
                setUserData('');
            }
            return account;
        } catch (error) {
            console.log(error);
        }
        return false;
    }

    if (typeof ethereum !== 'undefined') {
        ethereum.on('accountsChanged', (accounts) => {
            if (accounts.length) {
                login();
            }
        });

        ethereum.on('chainChanged', async (chainId) => {
            window.location.reload();
        });

        ethereum.on('disconnected', (accounts) => {
            logout();
        });
    }

    const useUserHook = () => {
        return [userData, setUserData];
    }

    const useAlertHook = () => {
        return [alerts, setAlerts];
    }

    const checkCurrentChain = async (currentChainId = "") => {
        const projectChainId = NETWORK_CHAIN.toString().trim();
        const chainData = getCurrentChain(projectChainId);
        const chainId = currentChainId ? currentChainId : ethereum.chainId;
        return chainData && chainData.hex == chainId ? {
            status: true,
            data: chainData
        }: {
            status: false,
            data: chainData
        };
    }

    const getCurrentChain = (chainId = "rinkeby") => {
        chainId = typeof chainId === "string" && chainId ? chainId.trim() : "rinkeby";
        const networkChains = NETWORKCHAINS || [];
        return networkChains.find((chain) => chain.id == chainId) || {};
    }

    return (
        <MetamaskContext.Provider value={{
            useUserStorage: useUserHook,
            login,
            logout,
            web3: {
                provider: getWeb3Provider,
                address: userAddress,
                isConnected: checkIsWalletConnected,
            },
            useAlert: useAlertHook
        }} >
            <ToastContainer className="site-notification p-3" style={{
                zIndex: 9999
            }}>
                {alerts.length ? alerts.map((alert, index) => {
                    let variant = alert.variant.toLowerCase();
                    if (alert.autoRemove) { autoRemoveAlert(alert) }
                    return <Toast bg={variant} key={index} onClose={() => removeAlert(alert)}>
                        <Toast.Header>
                            <strong className="me-auto">{alert.title.toUpperCase()}</strong>
                            {/* <small>11 mins ago</small> */}
                        </Toast.Header>
                        <Toast.Body className={variant === 'Dark' && 'text-white'}>
                            {alert.message}
                        </Toast.Body>
                    </Toast>
                }) : ''}
            </ToastContainer>
            {children}
        </MetamaskContext.Provider>
    )
}

export async function useMetamaskContext() {
    return await useContext(MetamaskContext);
}

export default {
    provider: MetamaskProvider,
    getContract: getContract,
    getPrivateContract,
    web3Provider: getWeb3Provider,
    context: MetamaskContext,
    useContext: useMetamaskContext
};

