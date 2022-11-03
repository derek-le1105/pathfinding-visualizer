import './index.css'
import Node from './Node'

const Visualizer = () => {
    const renderBoard = () => {
        for (let i = 0; i < 10; i++) {
            for (let j = 0; j < 10; j++) {
                //prettier-ignore
                <Node></Node>
            }
        }
    }

    return (
        <>
            {renderBoard()}
            <Node></Node>
        </>
    )
}

export default Visualizer
