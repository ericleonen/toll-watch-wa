import Colors, { Color } from "./Colors";

export enum Theme {
    Success,
    Neutral,
    Failure
}

const Themes: { [theme in Theme]: {
    color: Color,
    backgroundColor: Color
} } = {
    [Theme.Success]: {
        color: Colors.successGreen,
        backgroundColor: Colors.lightSuccessGreen
    },
    [Theme.Neutral]: {
        color: Colors.darkGray,
        backgroundColor: Colors.lighterGray
    },
    [Theme.Failure]: {
        color: Colors.failureRed,
        backgroundColor: Colors.lightFailureRed
    }
}

export default Themes;