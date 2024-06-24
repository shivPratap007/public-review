import { useFeedBackItemContext } from "./Hooks";

export default function HashtagList() {
  const{companies,handleSelectedCompany}=useFeedBackItemContext()
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
