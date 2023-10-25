import styled from 'styled-components';

export const InputGroup = styled.div`
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    width: 100%;
    gap: 0.5rem;
`

export const Label = styled.label`
    align-self: flex-start;
    color: ${({$color}) => {return $color === 'danger' ? '#BE2E2E' : '#159976'}};
    font-size: 1rem;
    font-weight: 400;
`

export const Input = styled.input`
    display: flex;
    align-items: flex-start;
    align-self: stretch;
    border-radius: 0.3rem;
    border: 1px solid ${({$color}) => {return $color === 'danger' ? '#BE2E2E' : '#D2D0DC'}};
    width: 100%;
    padding: .5rem;

    &:focus {
        background-color: #d2d0dc65;
        border: 1px solid ${({$color}) => {return $color === 'danger' ? '#BE2E2E' : '#159976'}};
    }
`

export const InputContainer = styled.div`
    position: relative;
    width: 100%;
`

export const Icon = styled.button`
    position: absolute;
    top: 0.7rem;
    right: 0.7rem;
    cursor: pointer;
    background-color: transparent;
    border: 0;
    color: ${({$color}) => {return $color === 'danger' ? '#BE2E2E' : '#159976'}};
`

export const TextArea = styled.textarea`
    display: flex;
    align-items: flex-start;
    align-self: stretch;
    border-radius: 0.3rem;
    border: 1px solid ${({$color}) => {return $color === 'danger' ? '#BE2E2E' : '#159976'}};
    width: 100%;
    padding: .5rem;

    &:focus {
        background-color: #d2d0dc65;
        border: 1px solid ${({$color}) => {return $color === 'danger' ? '#BE2E2E' : '#159976'}};
    }
`

export const Select = styled.select`
    display: flex;
    align-items: flex-start;
    align-self: stretch;
    border-radius: 0.3rem;
    border: 1px solid ${({$color}) => {return $color === 'danger' ? '#BE2E2E' : '#159976'}};
    width: 100%;
    padding: .5rem;

    &:focus {
        background-color: #d2d0dc65;
        border: 1px solid ${({$color}) => {return $color === 'danger' ? '#BE2E2E' : '#159976'}};
    }
`