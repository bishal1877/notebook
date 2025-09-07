import Notecontext from "./Notescontext";
 



function Notestate(props) {
   
    return (
        <Notecontext.Provider value={[]}>
            {props.children}
        </Notecontext.Provider>
    )
}
export default Notestate;