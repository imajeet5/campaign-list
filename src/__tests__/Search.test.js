import { render, fireEvent, screen, waitFor } from "@testing-library/react";
import userEvent from '@testing-library/user-event'
import App from "../App";
import CampaignList from "../components/CampaignList";
import store from "../state/store";
import { campaigns } from "../data/campaigns";
import { AddCampaigns } from "../state/campaignSlice";
import { act } from "react-dom/test-utils";




// test search by name
test("Search by name", async () => {
    render(<App />);
    store.dispatch(AddCampaigns(campaigns));
    const searchInput = await screen.findByTestId("searchInput");
    const searchSubmit = screen.getByTestId("searchInput-submit");

    fireEvent.change(searchInput, { target: { value: 'Blog' } })


    act(() => {
        searchSubmit.dispatchEvent(new MouseEvent("click", { bubbles: true }));
    })
    // wait 1 sec for re-rendering

    const elementsCountWithSearchedText = (await screen.findAllByText(/Blog/i)).length
    const dataRowsCount = (await screen.findAllByTestId("data-row")).length
    // const dataRows = await screen.findAllByAltText(/Blogtag/i)

    expect(searchInput).toHaveAttribute('placeholder', 'Search by name')
    expect(elementsCountWithSearchedText).toBe(dataRowsCount)


})