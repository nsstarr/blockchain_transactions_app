const ClearCacheButton = () => {
  const handleClearCache = () => {
    localStorage.removeItem('transactions');
  };

  return (
    <button
      onClick={handleClearCache}
      className='bg-none border border-button hover:bg-button hover:text-white font-medium text-button px-8 py-2 rounded-lg mt-4 hover:bg-primary-dark tracking-tighter'
    >
      Clear Cache
    </button>
  );
};

export default ClearCacheButton;