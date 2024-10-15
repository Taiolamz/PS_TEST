import ModalContainer from '@/components/modal-container'
import { Button } from '@/components/ui/button'
import React from 'react'

interface DeleteModalProps {
    show: boolean,
    modalClass?: string,
    title: string,
    handleClose: () => void,
    content: string | React.ReactNode,
    closeBtnTitle?: string,
    actionBtnTitle?: string,
    handleClick: (arg?: any) => void,
    loading?: boolean
}

export default function DeleteModal({ show, title, modalClass, handleClose, handleClick, closeBtnTitle = "Close", actionBtnTitle = "Yes, Delete", loading, content }: DeleteModalProps) {
    return (
        <ModalContainer
            show={show}
            modalClass="rounded-[.3rem]"
        >
            <div className="px-4 pb-4">
                <h3 className="text-sm text-red-500 font-medium">{title}</h3>
                {content}
                <div className="mb-3 flex justify-end gap-3">
                    <Button variant="outline" onClick={handleClose}>{closeBtnTitle}</Button>
                    <Button
                        variant="destructive"
                        loading={loading}
                        loadingText={actionBtnTitle}
                        disabled={loading}
                        onClick={handleClick}
                    >{actionBtnTitle}</Button>
                </div>
            </div>
        </ModalContainer>
    )
}
