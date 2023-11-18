function DropDown() {
  return (
    <select className="block w-sm text-sm font-medium transition duration-500 border border-gray-800 rounded-lg shadow-sm h-9 focus:border-blue-600 focus:ring-1 focus:ring-inset focus:ring-blue-600 bg-none mr-2" >
  <option value="week">Last week</option>
  <option value="month">Last month</option>
  <option value="year">Last year</option>
</select>
  )
}

export default DropDown