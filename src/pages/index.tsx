import {useState} from 'react'
import Field from '../../components/field'
import Head from 'next/head'
import Image from 'next/image'
import { Inter } from 'next/font/google'
import styles from '@/styles/Home.module.css'
import Mindsweeper from 'mindsweeper'
import { type Options } from 'mindsweeper/dist/types/game'

const defaultSize = 20;
const defaultMines = 80;
const defaultOptions : Options = {size:{width: defaultSize, height: defaultSize}, mines: defaultMines};
const defaultGame = new Mindsweeper.Game(defaultOptions);
interface Param {
  width?: number
  height?: number
  mines?: number
}

const defaultParam : Param = {};

export default function Home() {
  
  const [game, setGame] = useState(defaultGame);
  const [params, setParams] = useState(defaultParam);
  
  const updateParams = (e: any) => {
    const name: string = e.target.getAttribute('name');
    const value: string = e.target.value;
    setParams(Object.assign({}, params, {[name]: value}));
  }

  const generateGame = () => {
    setGame(
      new Mindsweeper.Game({size:{width: params.width || defaultSize, height: params.height || defaultSize}, mines: params.mines || defaultMines})
    )
  }

  return (
    <>
      <Field game={game}></Field>
      <div>
        <div>Width: <input type="number" onChange={updateParams} name="width" defaultValue={defaultSize} /></div>
        <div>Height: <input type="number" onChange={updateParams} name="height" defaultValue={defaultSize} /></div>
        <div>Mine count: <input type="mines" onChange={updateParams} name="mines" defaultValue={defaultMines} /></div>
        <button onClick={generateGame}>Generate game</button>
      </div>
    </>
  )
}
