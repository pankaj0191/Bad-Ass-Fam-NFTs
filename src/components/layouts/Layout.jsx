import Header from './Header'
import Footer from './Footer'

const Layout = ({ children, className = "" }) => {

	return (
		<>
			<div className={`main-bad-ass-fam ${className}`}>
				<Header />
				{children}
				<Footer />
			</div>
		</>
	);
}

export default Layout;