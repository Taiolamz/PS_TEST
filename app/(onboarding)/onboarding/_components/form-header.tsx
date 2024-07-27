import React from 'react';

interface FormHeaderProps {
    title: string,
    subTitle: string,
}

const FormHeader = ({title, subTitle}: FormHeaderProps) => {
    return (
        <>
            <h2 className="text-primary text-xl font-semibold mb-2">
               {title}
            </h2>
            <p className="text-foreground mb-6">
               {subTitle}
            </p>
        </>
    );
}

export default FormHeader;
