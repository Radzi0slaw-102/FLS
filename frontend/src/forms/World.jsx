const World = () => {
    const [selectedRegion, setSelectedRegion] = useState('')
    const [selectedPreset, setSelectedPreset] = useState('')
    const [startYear, setStartYear] = useState('')

    const handleRegionChange = (e) => {
        setSelectedRegion(e.target.value)
    }

    const handlePresetChange = (e) => {
        setSelectedPreset(e.target.value)
    }

    const handleStartYearChange = (e) => {
        setStartYear(e.target.value)
    }

    const handleSubmit = (e) => {
        e.preventDefault()
    }
    return (
        <form onSubmit={handleSubmit}>
            <FormControl mb={4}>
                <FormLabel>Info</FormLabel>
                <Textarea placeholder="World description" />
            </FormControl>

            <FormControl mb={4}>
                <FormLabel>Regions</FormLabel>
                <Select placeholder="Wybierz region" value={selectedRegion} onChange={handleRegionChange}>
                    <option value="region1">Region 1</option>
                    <option value="region2">Region 2</option>
                </Select>
            </FormControl>

            <FormControl mb={4}>
                <FormLabel>Select preset</FormLabel>
                <Select
                    value={selectedPreset}
                    onChange={handlePresetChange}
                >
                    <option value='no_preset' selected>No preset</option>
                    <option value="earth">Earth</option>
                </Select>
            </FormControl>

            <FormControl mb={4}>
                <FormLabel>Rok rozpoczęcia symulacji</FormLabel>
                <Input type="number" value={startYear} onChange={handleStartYearChange} />
            </FormControl>

            <Button type="submit" colorScheme="blue">
                Utwórz świat/uniwersum
            </Button>
        </form>
    )
}

export default World