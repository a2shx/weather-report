function LangButton(props) {
    const { lang, handleLangChange } = props;
    return(
        <button className='text-white text-sm font-bold bg-gray-700 px-4 py-1 mb-3 rounded-md ' onClick={handleLangChange}>
            {lang === 'en'? 'TH':'EN'}
        </button>
    )
}
export default LangButton;