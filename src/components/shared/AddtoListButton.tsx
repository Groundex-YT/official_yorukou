/* eslint-disable @next/next/no-img-element */
import React, { ButtonHTMLAttributes, useCallback, useMemo } from 'react'
import ListIcon from '@/icons/ListIcon'
import { BsCheckLg } from 'react-icons/bs'
import { Media } from '@/types/anilist'
import { toast } from 'react-toastify'
import { useUser } from '@/context/AuthenticationContextProvider'
import classNames from 'classnames'

interface WatchButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    className?: string
    data?: Media
    v?: boolean
    vClass?: string
}

const AddtoListButton: React.FC<WatchButtonProps> = ({
    className,
    data,
    v = false,
    vClass,
    ...restProps
}) => {
    // const user = useUser()
    // const { data: list, isLoading: isListLoading } = useList(user?.id!)
    // const { mutate: AddList } = useUpdateAddList(user?.id!, data!)
    // const { mutate: DeleteList } = useUpdateDeleteList(user?.id!, data?.id!)

    // const isList = useMemo(() => {
    //     return list?.find((object) => object.media_id === data?.id)
    //         ? true
    //         : false
    // }, [data?.id, list])

    const toggleList = useCallback(async () => {
        // if (user && data) {
        //     if (isList) {
        //         DeleteList()
        //         toast.success('Media was removed from list successfully!')
        //     } else {
        //         const { data: mediaExists, error } = await db
        //             .from('lists')
        //             .select('*')
        //             .eq('media_id', data?.id)
        //             .single()
        //         if (!mediaExists) {
        //             AddList()
        //             toast.success('Media added to list successfully')
        //         }
        //     }
        // }
    }, [])

    if (v) {
        return (
            <div
                onClick={toggleList}
                className={classNames('duration-300', vClass!)}
            >
                <div className="flex items-center space-x-2">
                    {/* {isList ? (
                        <BsCheckLg className="w-6 h-6" />
                    ) : (
                        <ListIcon className="w-6 h-6" />
                    )}
                    <p className="text-[15px] font-bold">
                        {isList ? 'Added' : 'Add to list'}
                    </p> */}
                </div>
            </div>
        )
    }

    return (
        <button
            onClick={toggleList}
            className={classNames(
                'transition-all duration-300 leading-[0px] flex items-center gap-1.5 bg-white/50 shadow-dark rounded-md font-bold text-slate-100 text-[15px] border-2 border-slate-100 hover:bg-white/60',
                className!
            )}
            {...restProps}
        >
            {/* <div className="w-[25px] h-[25px] flex items-center justify-center md1:!w-5 md1:!h-5">
                {isList ? (
                    <BsCheckLg className="w-full h-full" />
                ) : (
                    <ListIcon className="w-full h-full" />
                )}
            </div>
            <h1>{isList ? 'Added' : 'Add to list'}</h1> */}
        </button>
    )
}

export default AddtoListButton
