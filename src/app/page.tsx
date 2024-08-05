import MuiBox from "@/components/box/Box";
import Dashboard from "./ui/dashboard/Dashboard";
import MuiTypography from "@/components/typography/Typograph";
import { APP } from "@/constants/APP";
import MuiLink from "@/components/link/Link";

const Home = () => {
  return (
    <Dashboard className="flex flex-grow flex-wrap justify-between gap-8">
      <MuiBox className="flex flex-col justify-center flex-wrap gap-4">
        <MuiTypography fontSize={60} fontWeight={600}>
          KENDALL REY
        </MuiTypography>
        <MuiTypography fontSize={40} fontWeight={600}>
          MOZO
        </MuiTypography>
      </MuiBox>
      <MuiBox className="flex flex-col justify-center flex-wrap gap-4">
        {Object.values(APP.ROUTES.ADMIN).map((item) => (
          <MuiLink className="text-white" key={item.LINK} href={item.LINK}>
            <MuiTypography fontSize={50}>{item.NAME}</MuiTypography>
          </MuiLink>
        ))}
      </MuiBox>
    </Dashboard>
  );
};

export default Home;
