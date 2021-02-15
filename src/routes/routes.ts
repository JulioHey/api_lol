import {
    Router
} from 'express';

import axios from 'axios';

import {
    SummonerController
} from '../services/summonerController';

const router = Router();

const getSummonerController = new SummonerController("RGAPI-ac558bfb-3024-4fae-8ce6-470e28835e2e", axios, "E8FB08E835538312544F4D907361BF2E");

router.get("/summoner", getSummonerController.info)
router.get("/status", getSummonerController.status)
router.get("/steamId", getSummonerController.getStatics)

export default router;