"use client"

import {
    motion,
    MotionValue,
    useMotionValue,
    useSpring,
    useTransform,
    type SpringOptions,
    AnimatePresence,
} from "motion/react"
import React, {
    Children,
    cloneElement,
    useEffect,
    useMemo,
    useRef,
    useState,
} from "react"
import { NavLink } from "react-router"

import "./Dock.css"
import { AnimatedThemeToggler } from "@/components/ui/animated-theme-toggler.tsx"

const MotionNavLink = motion.create(NavLink)

export type DockItemData = {
    icon: React.ReactNode
    label: React.ReactNode
    onClick?: () => void
    link?: string
    className?: string
}

export type DockProps = {
    items: DockItemData[]
    className?: string
    distance?: number
    panelHeight?: number
    baseItemSize?: number
    dockHeight?: number
    magnification?: number
    spring?: SpringOptions
}

type DockItemProps = {
    className?: string
    children: React.ReactNode
    onClick?: () => void
    link?: string
    mouseX: MotionValue<number>
    spring: SpringOptions
    distance: number
    baseItemSize: number
    magnification: number
    label?: React.ReactNode
}

function DockItem({
    children,
    className = "",
    onClick,
    link,
    mouseX,
    spring,
    distance,
    magnification,
    baseItemSize,
    label,
}: Readonly<DockItemProps>) {
    if (!link && !onClick) {
        throw new Error(
            "DockItem: either `link` or `onClick` must be provided."
        )
    }

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const ref = useRef<any>(null)
    const isHovered = useMotionValue(0)

    const mouseDistance = useTransform(mouseX, (val) => {
        const rect = ref.current?.getBoundingClientRect() ?? {
            x: 0,
            width: baseItemSize,
        }
        return val - rect.x - baseItemSize / 2
    })

    const targetSize = useTransform(
        mouseDistance,
        [-distance, 0, distance],
        [baseItemSize, magnification, baseItemSize]
    )
    const size = useSpring(targetSize, spring)

    const handleKeyDown = (e: React.KeyboardEvent) => {
        if (e.key === "Enter" || e.key === " ") {
            e.preventDefault()
            onClick?.()
        }
    }

    const clonedChildren = Children.map(children, (child) =>
        React.isValidElement(child)
            ? cloneElement(
                  child as React.ReactElement<{
                      isHovered?: MotionValue<number>
                  }>,
                  { isHovered }
              )
            : child
    )

    const sharedProps = {
        ref,
        style: { width: size, height: size },
        className: `dock-item ${className}`,
        onHoverStart: () => isHovered.set(1),
        onHoverEnd: () => isHovered.set(0),
        onFocus: () => isHovered.set(1),
        onBlur: () => isHovered.set(0),
        "aria-label": typeof label === "string" ? label : undefined,
    }

    if (link) {
        return (
            <MotionNavLink to={link} {...sharedProps}>
                {clonedChildren}
            </MotionNavLink>
        )
    }

    return (
        <motion.div
            {...sharedProps}
            onClick={onClick}
            onKeyDown={handleKeyDown}
            tabIndex={0}
            role="button"
            aria-haspopup="true"
        >
            {clonedChildren}
        </motion.div>
    )
}

type DockLabelProps = {
    className?: string
    children: React.ReactNode
    isHovered?: MotionValue<number>
}

function DockLabel({
    children,
    className = "",
    isHovered,
}: Readonly<DockLabelProps>) {
    const [isVisible, setIsVisible] = useState(false)

    useEffect(() => {
        if (!isHovered) return
        const unsubscribe = isHovered.on("change", (latest) =>
            setIsVisible(latest === 1)
        )
        return () => unsubscribe()
    }, [isHovered])

    return (
        <AnimatePresence>
            {isVisible && (
                <motion.div
                    initial={{ opacity: 0, y: 0 }}
                    animate={{ opacity: 1, y: -10 }}
                    exit={{ opacity: 0, y: 0 }}
                    transition={{ duration: 0.2 }}
                    className={`dock-label ${className}`}
                    role="tooltip"
                    style={{ x: "-50%" }}
                >
                    {children}
                </motion.div>
            )}
        </AnimatePresence>
    )
}

type DockIconProps = {
    className?: string
    children: React.ReactNode
    isHovered?: MotionValue<number>
}

function DockIcon({ children, className = "" }: Readonly<DockIconProps>) {
    return <div className={`dock-icon ${className}`}>{children}</div>
}

export default function Dock({
    items,
    className = "",
    spring = { mass: 0.1, stiffness: 150, damping: 12 },
    magnification = 70,
    distance = 200,
    panelHeight = 68,
    dockHeight = 256,
    baseItemSize = 50,
}: Readonly<DockProps>) {
    const mouseX = useMotionValue(Infinity)
    const isHovered = useMotionValue(0)

    const maxHeight = useMemo(
        () => Math.max(dockHeight, magnification + magnification / 2 + 4),
        [magnification, dockHeight]
    )
    const heightRow = useTransform(isHovered, [0, 1], [panelHeight, maxHeight])
    const height = useSpring(heightRow, spring)

    return (
        <motion.div
            style={{ height, scrollbarWidth: "none" }}
            className="dock-outer"
        >
            <motion.div
                onMouseMove={({ pageX }) => {
                    isHovered.set(1)
                    mouseX.set(pageX)
                }}
                onMouseLeave={() => {
                    isHovered.set(0)
                    mouseX.set(Infinity)
                }}
                className={`dock-panel ${className}`}
                style={{ height: panelHeight }}
                role="toolbar"
                aria-label="Application dock"
            >
                {items.map((item, index) => (
                    <DockItem
                        key={index}
                        onClick={item.onClick}
                        link={item.link}
                        className={item.className}
                        mouseX={mouseX}
                        spring={spring}
                        distance={distance}
                        magnification={magnification}
                        baseItemSize={baseItemSize}
                        label={item.label}
                    >
                        <DockIcon>{item.icon}</DockIcon>
                        <DockLabel>{item.label}</DockLabel>
                    </DockItem>
                ))}
                <DockItem
                    mouseX={mouseX}
                    spring={spring}
                    distance={distance}
                    baseItemSize={baseItemSize}
                    magnification={magnification}
                    label="Changer le theme"
                    onClick={() => 1}
                >
                    <DockIcon className="w-full h-full ">
                        <AnimatedThemeToggler className="w-full h-full flex justify-center items-center"/>
                    </DockIcon>
                    <DockLabel>Theme</DockLabel>
                </DockItem>
            </motion.div>
        </motion.div>
    )
}
