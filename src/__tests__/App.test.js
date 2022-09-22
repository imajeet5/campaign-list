import { render, fireEvent, screen, waitFor } from "@testing-library/react";
import userEvent from '@testing-library/user-event'
import App from "../App";
import CampaignList from "../components/CampaignList";
import * as redux from 'react-redux'


const spy = jest.spyOn(redux, 'useSelector');



// spy.mockReturnValue({ campaign: { isLoading: false, campaignsList: [{ "id": 1, "name": "Divavu", "startDate": "9/19/2017", "endDate": "3/9/2018", "Budget": 88377, "userId": 3, "userName": "Clementine Bauch" }, { "id": 2, "name": "Jaxspan", "startDate": "11/21/2017", "endDate": "2/21/2018", "Budget": 608715, "userId": 6, "userName": "Mrs. Dennis Schulist" }, { "id": 3, "name": "Miboo", "startDate": "11/1/2017", "endDate": "6/20/2017", "Budget": 239507, "userId": 7, "userName": "Kurtis Weissnat" }, { "id": 4, "name": "Trilith", "startDate": "8/25/2017", "endDate": "11/30/2017", "Budget": 179838, "userId": 1, "userName": "Leanne Graham" }, { "id": 5, "name": "Layo", "startDate": "11/28/2017", "endDate": "3/10/2018", "Budget": 837850, "userId": 9, "userName": "Glenna Reichert" }, { "id": 6, "name": "Photojam", "startDate": "7/25/2017", "endDate": "6/23/2017", "Budget": 858131, "userId": 3, "userName": "Clementine Bauch" }, { "id": 7, "name": "Blogtag", "startDate": "6/27/2017", "endDate": "1/15/2018", "Budget": 109078, "userId": 2, "userName": "Ervin Howell" }, { "id": 8, "name": "Rhyzio", "startDate": "10/13/2017", "endDate": "1/25/2018", "Budget": 272552, "userId": 4, "userName": "Patricia Lebsack" }, { "id": 9, "name": "Zoomcast", "startDate": "9/6/2017", "endDate": "11/10/2017", "Budget": 301919, "userId": 8, "userName": "Nicholas Runolfsdottir V" }, { "id": 10, "name": "Realbridge", "startDate": "3/5/2018", "endDate": "10/2/2017", "Budget": 505602, "userId": 5, "userName": "Chelsey Dietrich" }] } })

// test search by name
test("Search by name", async () => {
    render(<App />)
    const searchInput = await screen.findByTestId("searchInput");



    const searchSubmit = await screen.findByTestId("searchInput-submit");
    await userEvent.type(searchInput, "Blogtag");
    await userEvent.click(searchSubmit);
    // const dataRows = await screen.findByTestId("data-rows")
    const dataRows = await screen.findAllByAltText(/Blogtag/i)
    console.log(dataRows.length)
    expect(searchInput).toHaveAttribute('placeholder', 'Search by name')
    expect(dataRows.length).toBe(10)


})