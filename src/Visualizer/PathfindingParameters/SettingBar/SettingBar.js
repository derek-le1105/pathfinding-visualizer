import { useState } from 'react'
import Button from './Button'
import AlgorithmDropDown from '../AlgorithmDropDown/AlgorithmDropDown'
import './SettingBar.css'

const SettingBar = ({ algorithm, setAlgorithm }) => {
  return (
    <>
      <div className="setting-bar" style={{ maxWidth: '100%' }}>
        <AlgorithmDropDown
          algorithm={algorithm}
          setAlgorithm={setAlgorithm}
        ></AlgorithmDropDown>
        <Button title="Visualize"></Button>
      </div>
    </>
  )
}

export default SettingBar
