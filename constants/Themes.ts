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
        color: Colors.SuccessGreen,
        backgroundColor: Colors.LightSuccessGreen
    },
    [Theme.Neutral]: {
        color: Colors.DarkGray,
        backgroundColor: Colors.LighterGray
    },
    [Theme.Failure]: {
        color: Colors.FailureRed,
        backgroundColor: Colors.LightFailureRed
    }
}

export default Themes;