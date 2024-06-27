export enum Status {
    NONE = 'none',
    ENTER = 'enter',
    LEAVE = 'leave',
}

export enum StepStatus {
    NONE = 'none',
    PREPARE = 'prepare',
    ACTIVE = 'active',
}

export interface CSSMotionProps {
    motionName: string
    children: (classname: string, ref: (node: HTMLElement | null) => void) => React.ReactElement
    visible: boolean
    onEnterPrepare?: () => void
    onLeavePrepare?: () => void
    onVisibleChanged?: (visible: boolean) => void
}
