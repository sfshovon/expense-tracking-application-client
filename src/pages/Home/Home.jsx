import PageTitle from '../../Components/PageTitle/PageTitle';
import ReactBarChart from '../../Components/ReactBarChart/ReactBarChart';

const Home = () => {
  return (
    <div className="min-h-screen bg-base-200 pt-20">
      <PageTitle title="Home" />
      <ReactBarChart/>
    </div>
  );
};

export default Home;
