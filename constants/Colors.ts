const Colors = {
    LightGreen: "#d2ebe2",
    DarkGreen: "#087c5c",
    LightSuccessGreen: "#e9f9ee",
    SuccessGreen: "#28a745",
    LightFailureRed: "#f8d7da",
    FailureRed: "#dc3545",
    White: "#ffffff",
    DarkWhite: "#f2f2f2",
    LighterGray: "#f5f5f5",
    LightGray: "#e5e5e5",
    Gray: "#9f9f9f",
    DarkGray: "#555555",
    TransparentBlack: "rgba(0, 0, 0, 0.4)",
    Black: "#1a1a1a"
}

export type Color = typeof Colors[keyof typeof Colors]

export default Colors;