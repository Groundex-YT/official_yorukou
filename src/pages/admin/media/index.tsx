import AdminHeader from '@/components/partial/AdminHeader'
import AdminSideBar from '@/components/partial/AdminSideBar'
import React from 'react'

const index = () => {
    return (
        <div className="w-screen h-screen overflow-hidden">
            <div className="w-full h-full overflow-hidden">
                <AdminHeader />
                <AdminSideBar />
                <div className="inline-flex">index</div>
            </div>
        </div>
    )
}

index.getLayout = index

export default index
