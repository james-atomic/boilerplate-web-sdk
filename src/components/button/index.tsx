import styles from './Button.module.css';
import { Colours } from '../../Colours';
interface ButtonProps {
    id: string;
    clicked: any;
}
export const Button = (props) => {
    let name;
    let text;
    let background;

    if(props.id === 'stream'){
        name = 'Vertical Stream'
        text = Colours.lighterPink
        background = Colours.hotPink
    } else if (props.id === 'single') {
        name = 'Single Card'
        text = Colours.lightBlue
        background = Colours.midBlue
    } else {
        name = 'Launcher'
        text = Colours.hotPink
        background = Colours.lightPink
    }

    return (
        <button className={ styles.button } onClick={props.clicked} id={props.id} style={{background: background, color: text}}>
            { name }
        </button>
    );
};