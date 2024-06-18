import React from 'react'
import NestedMenu from '@/components/shared/NestedMenu'
import SelectProfileModal from './SelectProfileModal'

const SelectProfile = () => {
    return (
        <NestedMenu.SubMenu
            menuKey="profile-selection"
            title={'Select your profile avatar'}
        >
            <SelectProfileModal />
        </NestedMenu.SubMenu>
    )
}

export default SelectProfile
