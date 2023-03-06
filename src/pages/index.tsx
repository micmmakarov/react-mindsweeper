import {useState} from 'react'
import Field from '../../components/field'
import Head from 'next/head'
import Image from 'next/image'
import { Inter } from 'next/font/google'
import styles from '@/styles/Home.module.css'
import Game from 'mindsweeper'

const defaultSize = 30;
const defaultMines = 100;


export default function Home() {
  const [game, setGame] = useState(new Game({size:{width: defaultSize, height: defaultSize}, mines: defaultMines}));
  const [params, setParams] = useState({});
  
  const updateParams = (e: any) => {
    const name: string = e.target.getAttribute('name');
    const value: string = e.target.value;
    setParams(Object.assign({}, params, {[name]: value}));
  }

  const generateGame = () => {
    setGame(
      new Game({size:{width: params.width || defaultSize, height: params.height || defaultSize}, mines: params.mines || defaultMines})
    )
  }

  return (
    <>
      <Field game={game}></Field>
      <div>
        <input type="number" onChange={updateParams} name="width" defaultValue={defaultSize} />
        <input type="number" onChange={updateParams} name="height" defaultValue={defaultSize} />
        <button onClick={generateGame}>Generate game</button>
      </div>
    </>
  )
}
