import AdminHeader from '@/components/partial/AdminHeader'
import AdminSideBar from '@/components/partial/AdminSideBar'
import React from 'react'

const home = () => {
    return (
        // <div className="w-screen h-screen overflow-hidden">
        //     <div className="w-full h-full overflow-hidden">
        //         {/* <AdminHeader />
        //         <AdminSideBar /> */}
        //         <div className="inline-flex">index</div>
        //     </div>
        // </div>
        <React.Fragment>Hello</React.Fragment>
    )
}

home.getAdminLayout = home

export default home
