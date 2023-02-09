// componente que nos devuelve el elemento de cada cuadro para jugar

export const Square = ( {children, isSelected, updateBoard, index} ) => {
    // Clase que nos permitira ponerle un style en css al jugador que tiene el turno ('X' o 'O')
    const className = `square ${isSelected ? 'is-selected' : ''}`
  
    const handleClick = () => {
      updateBoard(index);
    }
    return (
      <div onClick={handleClick} className={className}>
        {children}
      </div>
    )
  }