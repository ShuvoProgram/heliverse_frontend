function AvailableButton() {
  return (
    <div className="flex items-baseline">
    <div className="mx-4">
        Available
    </div>
    <div>
        <div className="flex space-x-4 items-baseline group">
            <div
                className="rounded-full flex bg-gray-50 border border-gray-300 py-2 px-4 space-x-4 group-checked:border-gray-500">
                <div>
                    <input type="radio" name="rdo" id="yes" className="peer hidden"/>
                    <label htmlFor="yes"
                        className="cursor-pointer peer-checked:text-blue-700 peer-checked:cursor-default text-gray-400">Yes</label>
                </div>
                <div>
                    <input type="radio" name="rdo" id="no" className="peer hidden"/>
                    <label htmlFor="no"
                        className="cursor-pointer peer-checked:text-gray-800 peer-checked:cursor-default text-gray-400">No</label>
                </div>
            </div>
            <div>
                <input type="radio" name="rdo" id="null" className="peer hidden" checked/>
                <label htmlFor="null" className="text-sm text-gray-200 peer-checked:inline hidden">Not set</label>
                <label htmlFor="null" className="text-sm cursor-pointer text-blue-400 peer-checked:hidden inline">Reset
                </label>
            </div>
        </div>
    </div>
</div>
  )
}

export default AvailableButton;