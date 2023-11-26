type TitleProps = {
    svgSrc: string;
    title: string;
    alt: string;
}

const Title = ({ svgSrc, title, alt }: TitleProps) => {
    return (
        <div className='flex-start gap-3 justify-start'>
            <img
                src={svgSrc}
                alt={alt}
                width={36}
                height={36}
            />
            <h2 className='h3-bold md:h2-bold text-left w-full'>{title}</h2>
        </div>
    );
};

export default Title;