import {
  Box,
  Button,
  Card,
  CardHeader,
  Container,
  Divider,
  Stack,
  Step,
  StepLabel,
  Stepper,
  Typography,
} from "@mui/material";
import InfoIcon from "@mui/icons-material/Info";
import Head from "next/head";
import { useState } from "react";
import { Layout as DashboardLayout } from "src/layouts/dashboard/layout";
import Cards from "src/sections/match/add/steps/cards";
import ChooseTeam from "src/sections/match/add/steps/choose-team";
import GoalsAndAssists from "src/sections/match/add/steps/goals-assists";
import StartingEleven from "src/sections/match/add/steps/starting-eleven";
import { useDispatch, useSelector } from "src/store";
import { getTeams } from "src/thunks/team";
import { getMatch } from "src/slices/match";
import { createMatch } from "src/thunks/match";
import { useRouter } from "next/router";

const steps = ["Choose team", "Starting eleven", "Goals & assists", "Cards"];

const Page = () => {
  const router = useRouter();

  const [activeStep, setActiveStep] = useState(0);
  const [skipped, setSkipped] = useState(new Set());

  const match = useSelector(getMatch);
  const dispatch = useDispatch();
  dispatch(getTeams());

  const isStepOptional = (step) => {
    return step === null;
  };

  const isStepSkipped = (step) => {
    return skipped.has(step);
  };

  const handleNext = (isLastStep) => {
    if (isLastStep) {
      dispatch(createMatch(match));

      alert(`Match has been saved successfully`);
      router.replace(`/matches`);

      return;
    }

    let newSkipped = skipped;
    if (isStepSkipped(activeStep)) {
      newSkipped = new Set(newSkipped.values());
      newSkipped.delete(activeStep);
    }

    setActiveStep((prevActiveStep) => prevActiveStep + 1);
    setSkipped(newSkipped);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleSkip = () => {
    if (!isStepOptional(activeStep)) {
      // You probably want to guard against something like this,
      // it should never occur unless someone's actively trying to break something.
      throw new Error("You can't skip a step that isn't optional.");
    }

    setActiveStep((prevActiveStep) => prevActiveStep + 1);
    setSkipped((prevSkipped) => {
      const newSkipped = new Set(prevSkipped.values());
      newSkipped.add(activeStep);
      return newSkipped;
    });
  };

  const handleReset = () => {
    setActiveStep(0);
  };

  const stepsForm = [
    {
      index: 0,
      page: <ChooseTeam />,
    },
    {
      index: 1,
      page: <StartingEleven />,
    },
    {
      index: 2,
      page: <GoalsAndAssists />,
    },
    {
      index: 3,
      page: <Cards />,
    },
  ];

  return (
    <>
      <Head>
        <title>Add Match | Home vs Away</title>
      </Head>
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          py: 8,
        }}
      >
        <Container maxWidth="lg">
          <Stack spacing={3}>
            <Card>
              <CardHeader
                subheader={
                  <Typography sx={{ display: "flex", mt: 2 }}>
                    <InfoIcon color="warning" sx={{ mr: 1 }} />
                    Refreshing the page will reset the form
                  </Typography>
                }
                title="Setup Match"
              />
              <Divider />

              <Box p={2} minHeight={500} display="flex" flexDirection="column">
                <Stepper activeStep={activeStep}>
                  {steps.map((label, index) => {
                    const stepProps = {};
                    const labelProps = {};
                    if (isStepOptional(index)) {
                      labelProps.optional = <Typography variant="caption">Optional</Typography>;
                    }
                    if (isStepSkipped(index)) {
                      stepProps.completed = false;
                    }
                    return (
                      <Step key={label} {...stepProps}>
                        <StepLabel {...labelProps}>{label}</StepLabel>
                      </Step>
                    );
                  })}
                </Stepper>
                <Box
                  flexGrow={1}
                  display="flex"
                  flexDirection="row"
                  alignItems="center"
                  justifyContent="space-evenly"
                  padding={16}
                >
                  {stepsForm[activeStep].page}
                </Box>
                <Box sx={{ display: "flex", flexDirection: "row", pt: 4 }}>
                  <Button
                    color="inherit"
                    disabled={activeStep === 0}
                    onClick={handleBack}
                    sx={{ mr: 1 }}
                  >
                    Back
                  </Button>
                  <Box sx={{ flex: "1 1 auto" }} />
                  {isStepOptional(activeStep) && (
                    <Button color="inherit" onClick={handleSkip} sx={{ mr: 1 }}>
                      Skip
                    </Button>
                  )}

                  <Button onClick={() => handleNext(activeStep === steps.length - 1)}>
                    {activeStep === steps.length - 1 ? "Finish" : "Next"}
                  </Button>
                </Box>
              </Box>
            </Card>
          </Stack>
        </Container>
      </Box>
    </>
  );
};

Page.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>;

export default Page;
