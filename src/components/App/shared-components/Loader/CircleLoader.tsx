import React from 'react'
import '@/components/App/shared-components/PlantingModal/Loader.scss'

export const CircleLoader = () => {
  return (
    <div className="sharedLoaderContainer">
      <div className="loro">
        <div className="circ" />
        <div className="circ3" />
        <div className="circ5" />
        <div className="circ7" />
        <div className="ojo" />
      </div>
    </div>
  )
}