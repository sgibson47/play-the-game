import React from 'react';

function getBadeMoveClass(render){
    return render ? "BadMove" : "HideBadMove"
};

const BadMove = ({render}) =>{
    return (
      <div className={getBadeMoveClass(render)}>
        That's not a valid move.
      </div>
    )
}

export default BadMove;