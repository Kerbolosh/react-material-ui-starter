import { ComponentProps, useEffect, useState } from "react";
import { Button, Grid } from "@material-ui/core";
import { ToastMessage } from "../ToastMessage";
import { useContext } from "react";
import Cookies from "js-cookie";
//import { useStyles } from "./styles";

//const classes = useStyles()
function CountButton(name: string) {
    const [count, setCount] = useState(parseInt(Cookies.get(name) || "0"));

    return <div>
        <Button
            variant="contained"
            color="primary"
            onClick={() => {
                setCount(count + 1)
                Cookies.set(name, (count + 1).toString(), { expires: 365 })
            }}
        >
            {name + ": "} {count}

        </Button>
    </div>
}

export function ButtonList() {

    const blankButton = CountButton("Blank");
    const punktButton = CountButton("Punkt");
    const suhleButton = CountButton("Suhle");
    const haxeButton = CountButton("Haxe");
    const schnauzeButton = CountButton("Schnauze");
    const backeButton = CountButton("Backe");

    return <>
        {blankButton}
        {punktButton}
        {suhleButton}
        {haxeButton}
        {schnauzeButton}
        {backeButton}
        <div>
            <Button
                variant="contained"
                color="primary"

            >
                {"Test: "} {Cookies.get("Suhle")}

            </Button>
        </div>
    </>
}