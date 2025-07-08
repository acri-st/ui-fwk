import { ReactNode } from "react"

export type IRouteSection = {
    section: ReactNode
}

export type IRoute = ({
    path: string
} | {
    href: string
    target?: string
} | {}) & {
    id: string
    label: ReactNode
    loginRequired?: boolean
    subroutes?: (IRoute | IRouteSection)[]
}