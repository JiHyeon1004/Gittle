import React,{ useState} from "react";
import Button from "./Button"
import styles from './Buttons.module.css'

function Buttons(){

    const [isOpen , setIsOpen] = useState(false);
    const [test, setTest]= useState(0)

    const closeModal = ()=>{
        setIsOpen(false)
    }
  

    return(
        <div className={styles.buttons}>
            {test}
            <Button comment="생성" isOpen={isOpen} close={closeModal} name="create"  
                call={()=>{
                    setTest(test+1)
                    setIsOpen(true)
                    console.log('생성호출!')
                }}
             />

            <Button comment="열기" isOpen={isOpen} close={closeModal} name="open" 
                call={()=>{
                    setTest(test+1)
                    setIsOpen(true)
                    console.log('열기호출!')
                }}
            />

            <Button comment="복제" isClone={isOpen} close={closeModal} name="clone" 
                call={()=>{
                    setTest(test+1)
                    setIsOpen(true)
                    console.log('복제호출!')
                }}
            />
        </div>
    )
    
}

export default Buttons;