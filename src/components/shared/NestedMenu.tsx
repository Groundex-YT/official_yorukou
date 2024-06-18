import classNames from 'classnames'
import React, {
    PropsWithChildren,
    createContext,
    useCallback,
    useContext,
    useMemo,
    useState,
} from 'react'

export interface Menu {
    title: string
    menuKey: string
    data?: any
}

interface ContextProps {
    activeMenu: Menu
    push: (menu: Menu) => void
    pop: () => void
    back: () => void
}

interface NestedMenuProps extends React.HTMLProps<HTMLDivElement> {}

const defaultHistory: Menu[] = [{ menuKey: 'profiles', title: 'base' }]

const NestedMenuContext = createContext<ContextProps>({
    activeMenu: { menuKey: 'profiles', title: 'Base' },
    push: () => {},
    pop: () => {},
    back: () => {},
})

const NestedMenu = ({
    children,
    className = '',
    ...props
}: PropsWithChildren<NestedMenuProps>) => {
    const [history, setHistory] = useState<Menu[]>(defaultHistory)

    const handleGoBack = useCallback(() => {
        setHistory((prev) => prev.slice(0, -1))
    }, [])

    const historyPush = useCallback((menu: Menu) => {
        setHistory((prev) => [...prev, menu])
    }, [])

    const historyPop = useCallback(() => {
        setHistory((prev) => prev.slice(0, -1))
    }, [])

    const activeMenu = useMemo(() => history[history.length - 1], [history])

    return (
        <NestedMenuContext.Provider
            value={{
                activeMenu,
                push: historyPush,
                pop: historyPop,
                back: handleGoBack,
            }}
        >
            <div
                className={classNames(
                    'w-screen relative h-screen flex flex-col items-center justify-center',
                    className
                )}
                {...props}
            >
                {children}
            </div>
        </NestedMenuContext.Provider>
    )
}

export interface SubMenuProps
    extends Omit<React.HTMLProps<HTMLUListElement>, 'onChange'> {
    menuKey: string
    title: string
    onChange?: (value: string) => void
}

const SubMenu: React.FC<SubMenuProps> = ({
    children,
    menuKey,
    title,
    onChange,
    ...props
}) => {
    const { activeMenu, push, back } = useContext(NestedMenuContext)

    const isActive = useMemo(
        () => activeMenu.menuKey === menuKey,
        [activeMenu.menuKey, menuKey]
    )

    const handleSetMenu = useCallback(
        (menuKey: string, title: string, data?: any) => {
            push({
                menuKey: menuKey,
                title: title,
                data,
            })
        },
        [push]
    )

    const handleBackMenu = useCallback(() => {
        back()
    }, [back])

    const resolvedChildren:
        | React.ReactElement<any, string | React.JSXElementConstructor<any>>
        | React.ReactPortal =
        React.isValidElement(children) && children.type === React.Fragment
            ? children.props.children
            : children

    if (React.Children.count(resolvedChildren) === 0) {
        return null
    }

    const childrenWithMenuKey = React.Children.map(
        resolvedChildren,
        (child) => {
            if (!React.isValidElement(child)) return

            const newElement = React.cloneElement(child, {
                ...child.props,
                parentMenuKey: menuKey,
                // activeItemKey: activeItemKey,
                onChange,
                activeMenu: activeMenu,
                setMenu: handleSetMenu,
                back: handleBackMenu,
            })

            return newElement
        }
    )

    return isActive ? (
        <React.Fragment>{childrenWithMenuKey}</React.Fragment>
    ) : null
}

//@ts-ignore
NestedMenu.SubMenu = SubMenu

export default NestedMenu
