import { IconSearch, IconMenuOrder } from '@tabler/icons-react';
import AdvanceFilterData from '../../../../components/AdvanceFilterData/AdvanceFilterData';
const SearchUserList = ({ posts, setSearchResults, setNoMatch, placeholder }) => {
  const columnLabels = ["First Name", "Last Name", "Email", "Phone Number", "Status", "About", "User Type"];
  const handleSubmit = (e) => e.preventDefault();
  const handleSearchChange = (e) => {
    const searchTerm = e.target.value.toLowerCase(); // Convert search term to lowercase for case-insensitive search

    if (!searchTerm) {
      setSearchResults(posts);
      setNoMatch(false); // Reset noMatch state when the search term is empty
      return;
    }

    const resultsArray = posts.filter((post) => {
      // Check if post and post.customerName are defined before accessing properties
      if (post && post.email) {
        return post.email.toLowerCase().includes(searchTerm);
      } else {
        return false; // Adjust this based on your requirements if customerName is not always defined
      }
    });

    setSearchResults(resultsArray);
    setNoMatch(resultsArray.length === 0); // Update noMatch state based on search results

  };

  return (
    <div className='d-flex'>
      <form className="input-group input-group-sm" onSubmit={handleSubmit}>
        <span className="input-group-text border-end-0 bg-white"><IconSearch size={16} /></span>
        <input
          className="form-control border-start-0"
          type="text"
          id="search"
          placeholder={placeholder}
          onChange={handleSearchChange}
        />
        {/* You can add a search button if needed */}
        {/* <button type="submit" className="search__button">
          Search
        </button> */}
      </form>
      <AdvanceFilterData labels={columnLabels} />
    </div>
  );
};

export default SearchUserList;