import { useCallback, useMemo, useState } from "react";
import Link from "next/link";
import Head from "next/head";
import ArrowDownOnSquareIcon from "@heroicons/react/24/solid/ArrowDownOnSquareIcon";
import ArrowUpOnSquareIcon from "@heroicons/react/24/solid/ArrowUpOnSquareIcon";
import PlusIcon from "@heroicons/react/24/solid/PlusIcon";
import { Box, Button, Container, Stack, SvgIcon, Typography } from "@mui/material";
import { useSelection } from "src/hooks/use-selection";
import { Layout as DashboardLayout } from "src/layouts/dashboard/layout";
import { MatchesTable } from "src/sections/match/matches-table";
import { MatchesSearch } from "src/sections/match/matches-search";
import { applyPagination } from "src/utils/apply-pagination";
import prisma from "src/lib/prisma";

const useMatches = (data, page, rowsPerPage) => {
  return useMemo(() => {
    return applyPagination(data, page, rowsPerPage);
  }, [data, page, rowsPerPage]);
};

const useMatchIds = (matches) => {
  return useMemo(() => {
    return matches.map((match) => match.id);
  }, [matches]);
};

const Page = ({ data }) => {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const matches = useMatches(data, page, rowsPerPage);
  const matchesIds = useMatchIds(matches);
  const matchesSelection = useSelection(matchesIds);

  const handlePageChange = useCallback((event, value) => {
    setPage(value);
  }, []);

  const handleRowsPerPageChange = useCallback((event) => {
    setRowsPerPage(event.target.value);
  }, []);

  console.log(data);

  return (
    <>
      <Head>
        <title>Matches | DSS 4</title>
      </Head>
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          py: 8,
        }}
      >
        <Container maxWidth="xl">
          <Stack spacing={3}>
            <Stack direction="row" justifyContent="space-between" spacing={4}>
              <Stack spacing={1}>
                <Typography variant="h4">Match History</Typography>
                <Stack alignItems="center" direction="row" spacing={1}>
                  <Button
                    color="inherit"
                    startIcon={
                      <SvgIcon fontSize="small">
                        <ArrowUpOnSquareIcon />
                      </SvgIcon>
                    }
                  >
                    Import
                  </Button>
                  <Button
                    color="inherit"
                    startIcon={
                      <SvgIcon fontSize="small">
                        <ArrowDownOnSquareIcon />
                      </SvgIcon>
                    }
                  >
                    Export
                  </Button>
                </Stack>
              </Stack>
              <div>
                <Link href="/matches/add">
                  <Button
                    startIcon={
                      <SvgIcon fontSize="small">
                        <PlusIcon />
                      </SvgIcon>
                    }
                    variant="contained"
                  >
                    Add
                  </Button>
                </Link>
              </div>
            </Stack>
            <MatchesSearch />
            <MatchesTable
              count={data.length}
              items={matches}
              onDeselectAll={matchesSelection.handleDeselectAll}
              onDeselectOne={matchesSelection.handleDeselectOne}
              onPageChange={handlePageChange}
              onRowsPerPageChange={handleRowsPerPageChange}
              onSelectAll={matchesSelection.handleSelectAll}
              onSelectOne={matchesSelection.handleSelectOne}
              page={page}
              rowsPerPage={rowsPerPage}
              selected={matchesSelection.selected}
            />
          </Stack>
        </Container>
      </Box>
    </>
  );
};

export const getServerSideProps = async ({ req }) => {
  const matches = await prisma.match.findMany({
    orderBy: [{ date: "desc" }],
    include: {
      home: true,
      away: true,
    },
  });
  const data = matches.map((match) => ({
    ...match,
    date: `${match.date.getDate()}/${match.date.getMonth()}/${match.date.getFullYear()}`,
  }));

  return { props: { data } };
};

Page.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>;

export default Page;
