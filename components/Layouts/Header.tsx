/* Importing the necessary components from the Material UI library. */
import * as React from "react";
import { styled, useTheme } from "@mui/material/styles";
import MuiAppBar, { AppBarProps as MuiAppBarProps } from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";

const drawerWidth = 240;

/* Extending the MuiAppBarProps interface with an additional property called open. */
interface AppBarProps extends MuiAppBarProps {
    open?: boolean;
}

/* Creating a styled component that is a Material UI AppBar component. */
const AppBar = styled(MuiAppBar, {
    shouldForwardProp: (prop) => prop !== "open",
})<AppBarProps>(({ theme, open }) => ({
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(["width", "margin"], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
    }),
    ...(open && {
        marginLeft: drawerWidth,
        width: `calc(100% - ${drawerWidth}px)`,
        transition: theme.transitions.create(["width", "margin"], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen,
        }),
    }),
}));

/**
 * HeaderProps is an object with two properties, open and onDrawerOpen. open is a boolean and
 * onDrawerOpen is a function that takes no arguments and returns nothing.
 * @property {boolean} open - boolean - This is the state of the drawer.
 * @property onDrawerOpen - This is a function that will be called when the drawer is opened.
 */
type HeaderProps = {
    open: boolean;
    onDrawerOpen: () => void;
}
/**
 * `Header` is a function that takes in an `open` boolean and an `onDrawerOpen` function and returns a
 * `AppBar` component with a `Toolbar` component and an `IconButton` component
 * @param {HeaderProps}  - The `open` prop is a boolean that determines whether the drawer is open or
 * not.
 * @returns A React component
 */
export default function Header({ open, onDrawerOpen }: HeaderProps) {

    return (
        <AppBar position="fixed" open={open}>
            <Toolbar>
                <IconButton
                    color="inherit"
                    aria-label="open drawer"
                    onClick={onDrawerOpen}
                    edge="start"
                    sx={{
                        marginRight: 5,
                        ...(open && { display: "none" }),
                    }}
                >
                    <MenuIcon />
                </IconButton>
                <Typography variant="h6" noWrap component="div">
                    Mini variant drawer
                </Typography>j
            </Toolbar>
        </AppBar>
    );
}
