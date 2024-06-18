import React from 'react'
import ProfileMenu from '@/components/Nested/ManageProfiles'

const ManageProfiles = () => {
    return (
        <React.Fragment>
            <ProfileMenu />
        </React.Fragment>
    )
}

// @ts-ignore
ManageProfiles.getLayout = (page: any) => page

export default ManageProfiles
