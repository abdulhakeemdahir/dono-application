import { makeStyles } from "@material-ui/core/styles";
import CssBaseline from "@material-ui/core/CssBaseline";

const useStyles = makeStyles({
	gradientStyle: {
		// backgroundColor: "rgb(0, 212, 255)",
		background:
			"linear-gradient(180deg, rgba(0,212,255,0) 10%, rgba(29,233,182,0.6566887535816619) 51%, rgba(29,196,233,.8) 120%);",
		bottom: "0px",
		position: "fixed",
		height: "45vh",
		width: "100%",
		zIndex: "-100",
	},
});
export default function Gradient() {
	const classes = useStyles();
	return (
		<CssBaseline>
			<div className={classes.gradientStyle}></div>
		</CssBaseline>
	);
}