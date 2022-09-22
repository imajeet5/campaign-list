import { MDBContainer, MDBTable, MDBTableBody, MDBTableHead } from 'mdbreact';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { FaSearch } from 'react-icons/fa';
import './styles.css';
import { FullPageSpinner } from '../shared/Spinner';

const CampaignList = () => {
  const campaign = useSelector((store) => store.campaign);
  const [campaignList, setCampaignList] = useState([]);
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  // this list is use for the search by text
  const [dateFilterList, setDateFilterList] = useState([]);

  useEffect(() => {
    setCampaignList([...campaign.campaignsList]);
    setDateFilterList([...campaign.campaignsList]);
  }, [campaign]);

  if (campaign.isLoading) {
    return <FullPageSpinner />;
  }

  const handleSearchClick = (event) => {
    event.preventDefault();
    const searchedText = event.target.elements.search.value;
    if (searchedText === '') {
      setCampaignList([...dateFilterList]);
    } else {
      const filteredList = dateFilterList.filter((el) =>
        el.name.includes(searchedText)
      );
      setCampaignList(filteredList);
    }
  };

  const handleDateSearch = (event) => {
    event.preventDefault();

    if (!startDate || !endDate) {
      setCampaignList(campaign.campaignsList);

      setDateFilterList(campaign.campaignsList);
      return;
    }

    const filteredList = campaign.campaignsList.filter((el) => {
      return (
        new Date(el.startDate) > new Date(startDate) &&
        new Date(el.endDate) < new Date(endDate)
      );
    });

    setCampaignList(filteredList);

    setDateFilterList(filteredList);
  };

  const getStatus = (startDate, endDate) => {
    const dateOne = new Date(startDate);
    const dateTwo = new Date(endDate);
    const currDate = new Date();

    if (currDate > dateOne && currDate < dateTwo)
      return (
        <div className="box">
          <span className="dot dotGreen"></span> Active
        </div>
      );
    else
      return (
        <div className="box">
          {' '}
          <span className="dot dotRed"></span>Inactive
        </div>
      );
  };

  return (
    <MDBContainer fluid>
      <div className="header">
        <form className="datePickerContainer" onSubmit={handleDateSearch}>
          <div className="date-input">
            <label htmlFor="start">Start Date :</label>
            <input
              id="start"
              type="date"
              placeholder="Start Date"
              max={endDate}
              onSelect={(e) => setStartDate(e.target.value)}
            />
          </div>
          <div className="date-input">
            <label htmlFor="end">End Date :</label>
            <input
              id="end"
              type="date"
              placeholder="End Date"
              onSelect={(e) => setEndDate(e.target.value)}
              min={startDate}
            />
          </div>
          <div className="date-input">
            <input id="start" type="Submit" placeholder="Submit" />
          </div>
        </form>
        <form onSubmit={handleSearchClick}>
          <input
            className="searchInput"
            placeholder="Search by name"
            id="search"
            type="search"
            data-testid="searchInput"
          />

          <label htmlFor="search">
            <button type="submit" className="searchInput-submit">
              <FaSearch aria-label="search" data-testid="searchInput-submit" />
            </button>
          </label>
        </form>
      </div>

      <MDBTable bordered>
        <MDBTableHead color="blue">
          <tr>
            <th scope="col">Name</th>
            <th scope="col">UserName</th>
            <th scope="col">Start Date</th>
            <th scope="col">End Date</th>
            <th scope="col">Active</th>
            <th scope="col">Budget</th>
          </tr>
        </MDBTableHead>
        <MDBTableBody data-testid="data-rows">
          {campaignList.map((data, i) => (
            <tr key={i}>
              <th>{data.name}</th>
              <td>{data.userName}</td>
              <td>{data.startDate}</td>
              <td>{data.endDate}</td>
              <td>{getStatus(data.startDate, data.endDate)}</td>
              <td>{data.Budget}</td>
            </tr>
          ))}
        </MDBTableBody>
      </MDBTable>
    </MDBContainer>
  );
};

export default CampaignList;
