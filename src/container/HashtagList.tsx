import useStore from "../store/store";

export default function HashtagList() {
  const companies = useStore((state) => state.getCompanyList());
  const handleSelectedCompany = useStore((state) => state.handleSelectedCompany);

  return (

    <ul className="hashtags">
      <li >
          <button onClick={()=> handleSelectedCompany("All")} >#All</button>
      </li>
      {companies.map((company) => (
        <li key={company}>
          <button onClick={()=> handleSelectedCompany(company)} >#{company}</button>
        </li>
      ))}
    </ul>
  );
}
