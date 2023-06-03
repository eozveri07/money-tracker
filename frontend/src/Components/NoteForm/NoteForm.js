import React, { useState } from 'react'
import { useGlobalContext } from '../../context/globalContext';
import Button from '../Button/Button';
import { plus } from '../../utils/Icons';
import DatePicker from 'react-datepicker'
import "react-datepicker/dist/react-datepicker.css";
import styled from 'styled-components'

function NoteForm() {
    const {addNote, error, setError} = useGlobalContext()
    const [inputState, setInputState] = useState({
        title: '',
        amount: '',
        description: '',
        date: '',
    })

    const { title, amount, description, date } = inputState;

    const handleInput = name => e => {
        setInputState({...inputState, [name]: e.target.value})
        setError('')
    }

    const handleSubmit = e => {
        e.preventDefault()
        addNote(inputState)
        setInputState({
            title: '',
            amount: '',
            description: '',
            date: '',
        })
    }

    return (
        <NoteFormStyled onSubmit={handleSubmit}>
            {error && <p className='error'>{error}</p>}
            <div className="input-control">
                <input 
                    type="text" 
                    value={title}
                    name={'title'} 
                    placeholder="Başlık"
                    onChange={handleInput('title')}
                />
            </div>
            <div className="input-control">
                <input 
                    type="number" 
                    value={amount}
                    name={'amount'} 
                    placeholder="Miktar"
                    onChange={handleInput('amount')}
                />
            </div>
            <div className="input-control">
                <textarea name="description" value={description} placeholder='Açıklama' id="description" cols="30" rows="4" onChange={handleInput('description')}></textarea>
            </div>
            <div className="input-control">
                <DatePicker 
                    id='date'
                    placeholderText='Tarih Seç'
                    selected={date}
                    dateFormat="dd/MM/yyyy"
                    onChange={(date) => {
                        setInputState({...inputState, date: date})
                    }}
                />
            </div>
            <div className="submit-btn">
                <Button 
                    name={'Ekle'}
                    icon={plus}
                    bPad={'.8rem 1.6rem'}
                    bRad={'30px'}
                    bg={'var(--color-accent'}
                    color={'#fff'}
                />
            </div>
        </NoteFormStyled>
    )
}

const NoteFormStyled = styled.form`
    display: flex;
    flex-direction: column;
    gap: 2rem;
    input, textarea, select {
        font-family: inherit;
        font-size: inherit;
        outline: none;
        border: none;
        padding: .5rem 1rem;
        border-radius: 5px;
        border: 2px solid #fff;
        background: transparent;
        resize: none;
        box-shadow: 0px 1px 15px rgba(0, 0, 0, 0.06);
        color: rgba(34, 34, 96, 0.9);
        &::placeholder{
            color: rgba(34, 34, 96, 0.4);
        }
    }
    .input-control{
        input{
            width: 100%;
        }
    }
    .submit-btn{
        button{
            box-shadow: 0px 1px 15px rgba(0, 0, 0, 0.06);
            &:hover{
                background: var(--color-green) !important;
            }
        }
    }
`;

export default NoteForm;
