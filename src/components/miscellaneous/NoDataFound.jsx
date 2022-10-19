
export default function NoDataFound ({ children = 'No Data Found' }) {

    return (
        <div>
           <p className="dark:text-[#fff] text-[#969696] text-left text-sm my-3">{children}</p> 
        </div>
    )
}