import NestedMenu from '@/components/shared/NestedMenu'
import React from 'react'
import ManageProfiles from './ManageProfiles'
import EditProfiles from './EditProfiles'
import DeletionWarning from './DeletionWarning'
import SelectProfile from './SelectProfile'

const Menu = React.memo(() => (
    <NestedMenu className="!w-full">
        <ManageProfiles />
        <EditProfiles />
        <DeletionWarning />
        <SelectProfile />
    </NestedMenu>
))

Menu.displayName = 'NestedMenuProfiles'

const NestedMenuProfiles = (props: any) => {
    return (
        <React.Fragment>
            <Menu />
        </React.Fragment>
    )
}

export default React.memo(NestedMenuProfiles)
