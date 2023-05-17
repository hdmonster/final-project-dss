import { useCallback, useMemo, useState } from "react";
import Head from "next/head";
import ArrowDownOnSquareIcon from "@heroicons/react/24/solid/ArrowDownOnSquareIcon";
import ArrowUpOnSquareIcon from "@heroicons/react/24/solid/ArrowUpOnSquareIcon";
import PlusIcon from "@heroicons/react/24/solid/PlusIcon";
import { Box, Button, Container, Stack, SvgIcon, Typography } from "@mui/material";
import { useSelection } from "src/hooks/use-selection";
import { Layout as DashboardLayout } from "src/layouts/dashboard/layout";
import { PlayersTable } from "src/sections/player/players-table";
import { PlayersSearch } from "src/sections/player/players-search";
import { applyPagination } from "src/utils/apply-pagination";
import Link from "next/link";
import { useRouter } from "next/router";

const usePlayers = (data, page, rowsPerPage) => {
  return useMemo(() => {
    return applyPagination(data, page, rowsPerPage);
  }, [data, page, rowsPerPage]);
};

const usePlayerIds = (players) => {
  return useMemo(() => {
    return players.map((player) => player.id);
  }, [players]);
};

const Page = ({ data }) => {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const players = usePlayers(data, page, rowsPerPage);
  const playersIds = usePlayerIds(players);
  const playersSelection = useSelection(playersIds);

  const handlePageChange = useCallback((event, value) => {
    setPage(value);
  }, []);

  const handleRowsPerPageChange = useCallback((event) => {
    setRowsPerPage(event.target.value);
  }, []);

  const router = useRouter();

  return (
    <>
      <Head>
        <title>Starting Eleven | Club Name</title>
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
                <Typography variant="h4">Players</Typography>
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
                <Link href={"/clubs/" + router.query.id + "/starting-eleven/add"}>
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
            <PlayersSearch />
            <PlayersTable
              count={data.length}
              items={players}
              onDeselectAll={playersSelection.handleDeselectAll}
              onDeselectOne={playersSelection.handleDeselectOne}
              onPageChange={handlePageChange}
              onRowsPerPageChange={handleRowsPerPageChange}
              onSelectAll={playersSelection.handleSelectAll}
              onSelectOne={playersSelection.handleSelectOne}
              page={page}
              rowsPerPage={rowsPerPage}
              selected={playersSelection.selected}
            />
          </Stack>
        </Container>
      </Box>
    </>
  );
};

export const getServerSideProps = async ({ req }) => {
  const now = new Date();

  const data = [
    {
      id: "5e887ac47eed253091be10cb",
      name: "Carson Darrin",
      position: "Striker",
      jersey_number: 13,
      goals: 5,
      assists: 12,
      cards: 0,
    },
    {
      id: "5e887ac47eed253091be10cxb",
      name: "Nobunaga Ichi",
      position: "Goalkeeper",
      jersey_number: 1,
      goals: 0,
      assists: 0,
      cards: 0,
    },
    {
      id: "5e887ac47eed253091be10acb",
      name: "Bucks Solana",
      position: "Winger",
      jersey_number: 7,
      goals: 12,
      assists: 18,
      cards: 0,
    },
    {
      id: "5e887ac47eed253091be1gf0cb",
      name: "Tristan Tate",
      position: "Winger",
      jersey_number: 4,
      goals: 12,
      assists: 32,
      cards: 0,
    },
  ];

  return { props: { data } };
};

Page.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>;

export default Page;
