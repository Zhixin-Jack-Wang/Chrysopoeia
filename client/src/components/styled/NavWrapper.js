import styled from "styled-components";

export const SectionWrapper = styled.section`
  .spacer {
    width: 100%;
    height: 4rem;
  }
`;
export const Nav = styled.nav`
  width: 100%;
  background: var(--mainYellow);
  .navbar-brand {
    @media (max-width: 768px) {
      width: 4rem;
      height: 4rem;
    }
  }

  .wrapper {
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: space-between;
    .mystuff-link {
    }
  }
  .nav-link {
    color: var(--mainWhite) !important;
    font-size: 1.3rem;
    text-transform: capitalize;
    @media (max-width: 768px) {
      display: none;
    }
  }
  @media (max-width: 768px) {
    position: fixed;
    z-index: 2;
    .navbar-nav {
      flex-direction: row !important;
    }
  }

  .btn-group {
    width: 100%;
    display: flex;
    justify-content: center;
    .btn-me {
      color: white;
      border: none;
      font-weight: bold;
      background-color: #999ca1;
      border-right: 2px solid white;
      padding: 0.375rem 1rem;
      font-size: 1rem;
      transition: color 0.15s ease-in-out, background-color 0.15s ease-in-out,
        border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out;
      &:focus {
        background-color: var(--mainGrey);
        box-shadow: none;
        color: var(--lightBlue);
      }
    }
    #dropdown-basic-button {
      color: white;
      border: none;
      font-weight: bold;
      background-color: #999ca1;
      &:focus {
        background-color: var(--mainGrey);
        box-shadow: none;
        color: var(--lightBlue);
      }
    }
  }
`;
export const SearchWrapper = styled.div`
  width: 100%;
  justify-content: center;

  .search {
    width: 100%;
    position: relative;
    &-form {
      display: flex;
      justify-content: space-between;
    }
    &-bar {
      padding-left: 2.5rem;
      border: 0.05rem solid var(--mainWhite);
      border-radius: 5px;
    }
    &-icon {
      position: absolute;
      color: var(--mainBlue);
      left: 1rem;
      font-size: 1.2rem;
    }
    &-btn {
      padding: 0.18rem 1rem;
      color: var(--mainWhite);
      background-color: var(--lightBlue);
      border-radius: 5px;
      border: none;
      @media (max-width: 768px) {
        font-size: 1rem;
      }
      &:hover {
        color: black;
      }
    }
  }
`;
