
CREATE TABLE public.eating_moment (
    id integer NOT NULL,
    name text NOT NULL,
    "time" text NOT NULL,
    created_at timestamp with time zone DEFAULT now() NOT NULL,
    updated_at timestamp with time zone DEFAULT now() NOT NULL
);
--
-- Name: eating_moment_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.eating_moment_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;

--
-- Name: eating_moment_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.eating_moment_id_seq OWNED BY public.eating_moment.id;


--
-- Name: food; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.food (
    id integer NOT NULL,
    measure_unit text NOT NULL,
    quantity numeric NOT NULL,
    description text NOT NULL,
    protein numeric NOT NULL,
    chos numeric NOT NULL,
    fat numeric NOT NULL,
    calories numeric NOT NULL,
    created_at timestamp with time zone DEFAULT now() NOT NULL,
    updated_at timestamp with time zone DEFAULT now() NOT NULL
);

CREATE TABLE public.food_category (
    id integer NOT NULL,
    name text NOT NULL,
    created_at timestamp with time zone DEFAULT now() NOT NULL,
    updated_at timestamp with time zone DEFAULT now() NOT NULL
);




--
-- Name: food_category_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.food_category_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;




--
-- Name: food_category_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.food_category_id_seq OWNED BY public.food_category.id;


--
-- Name: food_has_eating_moment; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.food_has_eating_moment (
    food_id integer NOT NULL,
    eating_moment_id integer NOT NULL,
    updated_at timestamp with time zone DEFAULT now() NOT NULL,
    created_at timestamp with time zone DEFAULT now() NOT NULL,
    id integer NOT NULL
);




--
-- Name: food_has_eating_moment_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.food_has_eating_moment_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;




--
-- Name: food_has_eating_moment_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.food_has_eating_moment_id_seq OWNED BY public.food_has_eating_moment.id;


--
-- Name: food_has_food_category; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.food_has_food_category (
    food_id integer NOT NULL,
    food_category_id integer NOT NULL,
    created_at timestamp with time zone DEFAULT now() NOT NULL,
    updated_at timestamp with time zone DEFAULT now() NOT NULL,
    id integer NOT NULL
);




--
-- Name: food_has_food_category_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.food_has_food_category_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;




--
-- Name: food_has_food_category_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.food_has_food_category_id_seq OWNED BY public.food_has_food_category.id;


--
-- Name: food_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.food_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;




--
-- Name: food_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.food_id_seq OWNED BY public.food.id;


--
-- Name: goal; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.goal (
    id integer NOT NULL,
    name text NOT NULL,
    created_at timestamp with time zone DEFAULT now() NOT NULL,
    updated_at timestamp with time zone DEFAULT now() NOT NULL
);




--
-- Name: goal_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.goal_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;




--
-- Name: goal_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.goal_id_seq OWNED BY public.goal.id;


--
-- Name: measurement; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.measurement (
    id integer NOT NULL,
    control numeric NOT NULL,
    weight numeric NOT NULL,
    height numeric NOT NULL,
    fitness_level numeric NOT NULL,
    plg_triceps numeric NOT NULL,
    plg_subscapular numeric NOT NULL,
    plg_suprailiac numeric NOT NULL,
    plg_abdominal numeric NOT NULL,
    plg_thigh numeric NOT NULL,
    plg_calf numeric NOT NULL,
    prm_arm numeric NOT NULL,
    prm_waist numeric NOT NULL,
    prm_hip numeric NOT NULL,
    prm_thigh numeric NOT NULL,
    prm_calf numeric NOT NULL,
    dm_elbow numeric NOT NULL,
    dm_wrist numeric NOT NULL,
    dm_knee numeric NOT NULL,
    plg_supraspinal numeric NOT NULL,
    prm_chest numeric NOT NULL,
    x numeric NOT NULL,
    y numeric NOT NULL,
    plg_chest numeric NOT NULL,
    plg_armpit numeric NOT NULL,
    triglycerides text NOT NULL,
    uric_acid text NOT NULL,
    creatinine text NOT NULL,
    t3_t4 text NOT NULL,
    user_id integer NOT NULL,
    created_at timestamp with time zone DEFAULT now(),
    updated_at timestamp with time zone DEFAULT now()
);




--
-- Name: measurement_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.measurement_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;




--
-- Name: measurement_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.measurement_id_seq OWNED BY public.measurement.id;


--
-- Name: nutritionist; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.nutritionist (
    id integer NOT NULL,
    firstname text NOT NULL,
    lastname text NOT NULL,
    email text NOT NULL,
    phone text NOT NULL,
    address text NOT NULL,
    created_at timestamp with time zone DEFAULT now() NOT NULL,
    updated_at timestamp with time zone DEFAULT now() NOT NULL,
    password text
);




--
-- Name: nutritionist_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.nutritionist_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;




--
-- Name: nutritionist_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.nutritionist_id_seq OWNED BY public.nutritionist.id;


--
-- Name: plan; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.plan (
    id integer NOT NULL,
    user_id integer NOT NULL,
    comments text NOT NULL,
    goal_id integer NOT NULL,
    created_at timestamp with time zone DEFAULT now() NOT NULL,
    updated_at timestamp with time zone DEFAULT now() NOT NULL,
    nutritionist_id integer
);




--
-- Name: plan_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.plan_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;




--
-- Name: plan_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.plan_id_seq OWNED BY public.plan.id;


--
-- Name: prescribed_food; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.prescribed_food (
    food_id integer NOT NULL,
    plan_id integer NOT NULL,
    prescribed_quantity integer NOT NULL,
    eating_moment_name text NOT NULL,
    eating_moment_time text NOT NULL,
    created_at timestamp with time zone DEFAULT now() NOT NULL,
    updated_at timestamp with time zone DEFAULT now() NOT NULL,
    id integer NOT NULL
);




--
-- Name: prescribed_food_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.prescribed_food_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;




--
-- Name: prescribed_food_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.prescribed_food_id_seq OWNED BY public.prescribed_food.id;


--
-- Name: user; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."user" (
    id integer NOT NULL,
    address text NOT NULL,
    email text NOT NULL,
    firstname text NOT NULL,
    image text NOT NULL,
    lastname text NOT NULL,
    password text NOT NULL,
    phone text NOT NULL,
    updated_at timestamp with time zone DEFAULT now() NOT NULL,
    created_at timestamp with time zone DEFAULT now() NOT NULL
);




--
-- Name: user_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.user_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;




--
-- Name: user_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.user_id_seq OWNED BY public."user".id;


--
-- Name: eating_moment id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.eating_moment ALTER COLUMN id SET DEFAULT nextval('public.eating_moment_id_seq'::regclass);


--
-- Name: food id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.food ALTER COLUMN id SET DEFAULT nextval('public.food_id_seq'::regclass);


--
-- Name: food_category id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.food_category ALTER COLUMN id SET DEFAULT nextval('public.food_category_id_seq'::regclass);


--
-- Name: food_has_eating_moment id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.food_has_eating_moment ALTER COLUMN id SET DEFAULT nextval('public.food_has_eating_moment_id_seq'::regclass);


--
-- Name: food_has_food_category id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.food_has_food_category ALTER COLUMN id SET DEFAULT nextval('public.food_has_food_category_id_seq'::regclass);


--
-- Name: goal id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.goal ALTER COLUMN id SET DEFAULT nextval('public.goal_id_seq'::regclass);


--
-- Name: measurement id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.measurement ALTER COLUMN id SET DEFAULT nextval('public.measurement_id_seq'::regclass);


--
-- Name: nutritionist id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.nutritionist ALTER COLUMN id SET DEFAULT nextval('public.nutritionist_id_seq'::regclass);


--
-- Name: plan id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.plan ALTER COLUMN id SET DEFAULT nextval('public.plan_id_seq'::regclass);


--
-- Name: prescribed_food id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.prescribed_food ALTER COLUMN id SET DEFAULT nextval('public.prescribed_food_id_seq'::regclass);


--
-- Name: user id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."user" ALTER COLUMN id SET DEFAULT nextval('public.user_id_seq'::regclass);


--
-- Data for Name: eating_moment; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO public.eating_moment VALUES (1, 'ALMUERZO', '1:00 PM', '2022-10-18 22:53:43.741278+00', '2022-10-19 21:00:18.813257+00');
INSERT INTO public.eating_moment VALUES (3, 'DESAYUNO', '8:00 AM', '2022-10-18 22:54:03.509584+00', '2022-11-02 20:01:32.885174+00');
INSERT INTO public.eating_moment VALUES (4, 'MEDIA MAÑANA', '10:30 AM', '2022-10-18 22:54:47.556528+00', '2022-11-02 20:02:18.930474+00');
INSERT INTO public.eating_moment VALUES (5, 'CUALQUIERA', '3:00 PM', '2022-10-18 22:55:01.156278+00', '2022-11-02 20:04:06.355219+00');
INSERT INTO public.eating_moment VALUES (6, 'CENA', '7:00 PM', '2022-10-18 22:55:07.383239+00', '2022-11-02 20:04:44.193553+00');
INSERT INTO public.eating_moment VALUES (7, 'MEDIA TARDE', '3:30', '2022-10-18 22:55:16.889647+00', '2022-11-02 20:05:23.632422+00');
INSERT INTO public.eating_moment VALUES (8, 'POST ENTRENO', '5:00 PM', '2022-10-18 23:12:36.16338+00', '2022-11-02 20:06:25.450234+00');
INSERT INTO public.eating_moment VALUES (9, 'ANTES DE DORMIR', '9:00 PM', '2022-10-19 20:28:33.203642+00', '2022-11-02 20:07:30.97654+00');
INSERT INTO public.eating_moment VALUES (51, 'AL DESPERTAR', '6:00 AM', '2022-11-02 20:08:19.336166+00', '2022-11-02 20:08:19.336166+00');


--
-- Data for Name: food; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO public.food VALUES (1, 'Vaso', 1, 'jugo de naranja light country hill', 0, 18, 0, 72, '2022-10-19 18:58:34.332206+00', '2022-10-19 20:55:48.971626+00');
INSERT INTO public.food VALUES (2, 'Pocillo', 1, 'chocolate con leche 225g', 1, 28, 9, 221, '2022-10-19 21:04:20.336839+00', '2022-10-19 21:04:20.336839+00');
INSERT INTO public.food VALUES (3, 'Vaso', 1, 'avena alpina 200ml', 5, 32, 4, 184, '2022-10-19 21:06:44.430084+00', '2022-10-19 21:06:44.430084+00');
INSERT INTO public.food VALUES (35, 'Vaso', 1, 'jugo de fruta 300ML', 0.0, 17, 0.0, 68, '2022-11-02 19:17:58.925666+00', '2022-11-02 19:17:58.925666+00');
INSERT INTO public.food VALUES (36, 'vaso', 1, 'Bonyurt alpina 170g', 5, 40, 4, 216, '2022-11-02 19:46:20.39542+00', '2022-11-02 19:46:20.39542+00');
INSERT INTO public.food VALUES (37, 'Vaso', 1, 'yogurt finesse de alpina vaso 180g', 6, 17, 0.0, 92, '2022-11-02 20:33:44.018565+00', '2022-11-02 20:33:44.018565+00');
INSERT INTO public.food VALUES (38, 'Vaso', 1, 'yogurt light de alpina vaso 170g', 7, 11, 0.0, 72, '2022-11-02 20:39:32.120278+00', '2022-11-02 20:39:32.120278+00');
INSERT INTO public.food VALUES (39, 'Vaso', 1, 'milo leche entera (dos cucharadas)', 980, 307.9000, 101, 253.3000, '2022-11-02 20:48:23.031347+00', '2022-11-02 20:48:23.031347+00');
INSERT INTO public.food VALUES (40, 'Vaso', 1, 'milo leche semidescremada (dos cucharadas)', 13, 36, 101, 286.8990, '2022-11-02 20:50:20.056701+00', '2022-11-02 21:02:28.880896+00');
INSERT INTO public.food VALUES (41, 'Pocillo', 1, 'leche semidescremada 200ml', 7, 10, 3.5000, 99.5000, '2022-11-02 20:51:58.354657+00', '2022-11-02 21:03:20.537186+00');
INSERT INTO public.food VALUES (42, 'Pocillo', 1, 'cafe con leche semidescremada sin azucar 200 ml', 1, 10, 3, 71, '2022-11-02 20:56:15.160343+00', '2022-11-02 21:03:57.337474+00');
INSERT INTO public.food VALUES (43, 'Pocillo', 1, 'cafe con leche semidescremada cu/dita azucar 200ml', 1, 10, 1, 53, '2022-11-02 20:58:48.033038+00', '2022-11-02 21:04:25.973821+00');
INSERT INTO public.food VALUES (44, 'Pocillo', 1, 'cafe con leche semidescremada 2 cu/dita azucar 200ml', 1, 10, 3, 71, '2022-11-02 21:00:19.640998+00', '2022-11-02 21:04:53.497391+00');
INSERT INTO public.food VALUES (45, 'Pocillo', 1, 'leche entera', 6.4000, 10.3900, 7.1900, 131.9900, '2022-11-02 21:07:41.129889+00', '2022-11-02 21:07:41.129889+00');
INSERT INTO public.food VALUES (46, 'Vaso', 1, 'leche entera', 9.6000, 15.6000, 10.8000, 198.8000, '2022-11-02 22:32:59.048913+00', '2022-11-02 22:36:27.618113+00');
INSERT INTO public.food VALUES (47, 'Vaso', 1, 'leche semidescremada 300ml', 10.5000, 15, 5.2500, 149.2500, '2022-11-02 22:38:44.975198+00', '2022-11-02 22:38:44.975198+00');
INSERT INTO public.food VALUES (48, 'porcion', 1, 'papas cocinadas tamaño medio x2 unids', 187, 201.2000, 100, 888.8990, '2022-11-02 22:39:13.520435+00', '2022-11-02 23:15:15.113493+00');
INSERT INTO public.food VALUES (49, 'porción', 1, 'Pasta 80 S (porcion principal sin salsa)', 12, 58, 0.0, 280, '2022-11-03 18:23:24.327153+00', '2022-11-03 18:23:24.327153+00');
INSERT INTO public.food VALUES (50, 'porción', 1, 'Pasta 40 gramos (porcion principal sin salsa)', 60, 29, 0.0, 1400, '2022-11-03 18:24:15.308679+00', '2022-11-03 18:24:15.308679+00');
INSERT INTO public.food VALUES (51, 'rebanada', 1, 'Pan integral 34g', 185000002384186, 10, 0.5000, 520900001525879, '2022-11-03 18:24:16.046476+00', '2022-11-03 18:26:34.055111+00');
INSERT INTO public.food VALUES (52, 'Unidad', 1, 'Tortilla wrap bimbo 45g', 5, 34, 5, 201, '2022-11-03 18:30:04.916882+00', '2022-11-03 18:30:04.916882+00');
INSERT INTO public.food VALUES (53, 'Cucharadas', 1, 'arroz cocido', 139999997615814, 6, 340000003576279, 325999984741211, '2022-11-03 18:32:19.038464+00', '2022-11-03 18:32:19.038464+00');
INSERT INTO public.food VALUES (54, 'Porción', 1, 'arvejas 100 g', 630000019073486, 143999996185303, 400000005960465, 864000015258789, '2022-11-03 18:33:23.980698+00', '2022-11-03 18:33:23.980698+00');
INSERT INTO public.food VALUES (55, 'Porción', 1, 'lentejas por 100g', 11, 19.5000, 300000011920929, 124699996948242, '2022-11-03 18:36:18.884315+00', '2022-11-03 18:38:15.484795+00');
INSERT INTO public.food VALUES (56, 'Unidad (es)', 1, 'Champiñón 50 gr', 3, 1, 0.0, 16, '2022-11-03 18:40:16.975179+00', '2022-11-03 18:40:16.975179+00');
INSERT INTO public.food VALUES (57, 'Porción', 1, 'garbanzos(1/2 pocillo cocinado)', 5, 10, 4, 96, '2022-11-03 18:57:43.654448+00', '2022-11-03 18:57:43.654448+00');
INSERT INTO public.food VALUES (58, 'Rebanada (s)', 1, 'queso cuajada por 50 g', 2.2500, 3.5000, 2.6500, 46.8500, '2022-11-03 19:00:52.496786+00', '2022-11-03 19:00:52.496786+00');
INSERT INTO public.food VALUES (59, 'Rebanada (s)', 1, 'queso mozarella 15g', 434999990463257, 0.0, 430000019073486, 430000019073486, '2022-11-03 19:01:53.560258+00', '2022-11-03 19:01:53.560258+00');
INSERT INTO public.food VALUES (60, 'unidad', 1, 'Arepuela wrap bimbo 45g', 0.0, 22, 0.0, 90, '2022-11-03 19:04:22.421791+00', '2022-11-03 19:04:22.421791+00');
INSERT INTO public.food VALUES (61, 'Rebanada (s)', 1, 'queso colanta 1,2cm 50g', 10, 0.0, 11.5000, 143.5000, '2022-11-03 19:05:58.404112+00', '2022-11-03 19:05:58.404112+00');
INSERT INTO public.food VALUES (62, 'Porción', 1, 'parmesano por 15 gramos', 6, 300000011920929, 3.7500, 589500007629395, '2022-11-03 19:12:01.090155+00', '2022-11-03 19:12:01.090155+00');
INSERT INTO public.food VALUES (63, 'Rebanada', 1, 'queso finesse  15 g', 3, 0.5000, 3, 41, '2022-11-03 19:13:13.961981+00', '2022-11-03 19:13:13.961981+00');
INSERT INTO public.food VALUES (64, 'Unidad (es)', 1, 'Yema de Huevo', 4, 0.0, 4, 52, '2022-11-03 19:14:03.044277+00', '2022-11-03 19:14:03.044277+00');
INSERT INTO public.food VALUES (65, 'Unidad (es)', 1, 'Clara . (s) de huevo', 3, 0.0, 0.0, 12, '2022-11-03 19:14:35.838043+00', '2022-11-03 19:14:35.838043+00');
INSERT INTO public.food VALUES (66, 'Gramos', 1, 'Carne de cerdo magra 1 g 10% de grasa', 189999997615814, 0.0, 700000002980232, 138999998569489, '2022-11-03 19:16:29.220178+00', '2022-11-03 19:17:50.471403+00');
INSERT INTO public.food VALUES (67, 'Gramos', 1, 'Carne de res magra 1 g  (10%) de grasa', 180000007152557, 0.0, 999999977648258, 191999995708466, '2022-11-03 19:19:13.502353+00', '2022-11-03 19:19:13.502353+00');
INSERT INTO public.food VALUES (68, 'Gramos', 1, 'Pechuga de pollo magra 1 g sin piel', 0.2200, 0.0, 0.0100, 1.4500, '2022-11-03 19:22:44.483427+00', '2022-11-03 19:22:44.483427+00');
INSERT INTO public.food VALUES (69, 'Gramos', 1, 'Carne molida 1 g  (85% magra 15% grasa)', 180000007152557, 0.0, 200000002980232, 180000007152557, '2022-11-03 19:23:40.905648+00', '2022-11-03 19:23:40.905648+00');
INSERT INTO public.food VALUES (70, 'Gramos', 1, 'Trucha', 180000007152557, 0.0, 100000001490116, 162000000476837, '2022-11-03 19:26:22.901404+00', '2022-11-03 19:26:22.901404+00');
INSERT INTO public.food VALUES (71, 'Gramos', 1, 'Salmon', 200000002980232, 0.0, 100000001490116, 178999996185303, '2022-11-03 19:27:00.472728+00', '2022-11-03 19:27:00.472728+00');
INSERT INTO public.food VALUES (72, 'Gramos', 1, 'Pavo', 310000002384186, 0.0, 900000035762787, 223000001907349, '2022-11-03 19:27:53.279809+00', '2022-11-03 19:27:53.279809+00');
INSERT INTO public.food VALUES (73, 'Gramos', 1, 'Ternera', 230000004172325, 0.0, 299999993294477, 126999998092651, '2022-11-03 19:28:28.72574+00', '2022-11-03 19:28:28.72574+00');
INSERT INTO public.food VALUES (74, 'Unidad (es)', 1, 'Atún en lata en aceite 120 gr', 16, 0.0, 4, 110, '2022-11-03 19:29:42.380791+00', '2022-11-03 19:29:42.380791+00');
INSERT INTO public.food VALUES (75, 'Unidad (es)', 1, 'Atún en lata en agua 120 gr', 14, 0.0, 0.5000, 60, '2022-11-03 19:30:21.559737+00', '2022-11-03 19:30:21.559737+00');
INSERT INTO public.food VALUES (76, 'Gramos', 1, 'Sardina en salsa de tomate', 14.0159999996423710, 0.0, 119999997317791, 18400000333786, '2022-11-03 19:31:02.853825+00', '2022-11-03 19:31:02.853825+00');
INSERT INTO public.food VALUES (77, 'Gramos', 1, 'Bagre', 0.1800, 0.0, 0.1100, 1.7900, '2022-11-03 19:32:03.473677+00', '2022-11-03 19:32:03.473677+00');
INSERT INTO public.food VALUES (78, 'Gramos', 1, 'Camaron', 0.2300, 0.0, 0.1000, 1.0900, '2022-11-03 20:03:24.254195+00', '2022-11-03 20:03:24.254195+00');
INSERT INTO public.food VALUES (79, 'Porción (es)', 1, 'Jamón pietran (2 Rebanadas )', 5, 4, 1.5000, 50, '2022-11-03 20:05:26.017793+00', '2022-11-03 20:05:26.017793+00');
INSERT INTO public.food VALUES (80, 'Porción (es)', 1, 'Jamón pietran Premium  (2 Rebanadas )', 6, 3, 1.5000, 50, '2022-11-03 20:06:08.506842+00', '2022-11-03 20:06:08.506842+00');
INSERT INTO public.food VALUES (81, 'Rebanada (s)', 1, 'jamón de pavo', 7, 3, 2, 58, '2022-11-03 20:08:19.506152+00', '2022-11-03 20:08:19.506152+00');
INSERT INTO public.food VALUES (82, 'Rebanada (s)', 1, 'pavo pietran', 11, 1, 6, 102, '2022-11-03 20:11:54.905033+00', '2022-11-03 20:11:54.905033+00');
INSERT INTO public.food VALUES (83, 'Gramos', 1, 'Atún fresco', 0.4000, 0.0, 0.0700, 0.2300, '2022-11-03 20:24:04.131795+00', '2022-11-03 20:24:04.131795+00');
INSERT INTO public.food VALUES (84, 'Rebanada (s)', 1, 'jamón de pollo porción de 2 rebanadas', 4, 0.0, 1, 25, '2022-11-04 02:13:41.453858+00', '2022-11-04 02:13:41.453858+00');
INSERT INTO public.food VALUES (85, 'Huevo(s)', 1, 'life santa anita', 6, 1, 4, 64, '2022-11-04 02:14:43.961631+00', '2022-11-04 02:14:43.961631+00');
INSERT INTO public.food VALUES (86, 'Porcion', 1, 'nueces por 100 g', 16.1000, 7.9000, 66.6000, 695.4000, '2022-11-04 02:19:26.026544+00', '2022-11-04 02:19:26.026544+00');
INSERT INTO public.food VALUES (87, 'Porcion', 1, 'Salchichón por 100 g', 23.7900, 1.2000, 38.0900, 442.8900, '2022-11-04 02:20:08.930529+00', '2022-11-04 02:20:08.930529+00');
INSERT INTO public.food VALUES (88, 'Gramos', 1, 'Muslo de pollo', 0.2700, 0.0, 0.0300, 1.3600, '2022-11-04 02:22:12.446707+00', '2022-11-04 02:22:12.446707+00');
INSERT INTO public.food VALUES (89, 'Porción(es)', 1, 'Almendras 100 g', 20, 17, 54, 634, '2022-11-04 02:23:55.45063+00', '2022-11-04 02:23:55.45063+00');
INSERT INTO public.food VALUES (90, 'Porción', 1, 'Morcilla seleccionada 2 trozos', 5, 19, 9, 177, '2022-11-04 02:25:18.627205+00', '2022-11-04 02:25:18.627205+00');
INSERT INTO public.food VALUES (91, 'Porción (es)', 1, 'Nueces y pasas 100g', 14.1000, 31.5000, 34.1000, 489.1000, '2022-11-04 02:26:45.694878+00', '2022-11-04 02:26:45.694878+00');
INSERT INTO public.food VALUES (92, 'Porción(es)', 1, 'frutos secos 100g', 22.1000, 7.9000, 54.1000, 606.9000, '2022-11-04 02:29:41.819661+00', '2022-11-04 02:29:41.819661+00');
INSERT INTO public.food VALUES (93, 'Cucharada (s)', 1, 'avena en hojuelas', 279999995231628, 131999998092651, 279999995231628, 891999969482422, '2022-11-04 02:31:38.772613+00', '2022-11-04 02:31:38.772613+00');
INSERT INTO public.food VALUES (94, 'Cucharadita', 1, 'aceite de oliva 10 ml', 0.0, 0.0, 10, 90, '2022-11-04 02:33:22.644121+00', '2022-11-04 02:33:22.644121+00');
INSERT INTO public.food VALUES (95, 'unidad', 1, 'Apio  100g', 0.0, 0.0, 0.0, 0.0, '2022-11-04 02:35:19.732657+00', '2022-11-04 02:35:19.732657+00');
INSERT INTO public.food VALUES (96, 'unidad', 1, 'Berenjena   100g', 0.0, 0.0, 0.0, 0.0, '2022-11-04 02:35:47.536678+00', '2022-11-04 02:35:47.536678+00');
INSERT INTO public.food VALUES (97, 'unidad', 1, 'Brócoli  100 g', 0.0, 0.0, 0.0, 0.0, '2022-11-04 02:35:56.913628+00', '2022-11-04 02:35:56.913628+00');
INSERT INTO public.food VALUES (98, 'Porción (s)', 1, 'Coliflor 50 grs', 0.0, 0.0, 0.0, 0.0, '2022-11-04 02:37:55.815379+00', '2022-11-04 02:37:55.815379+00');
INSERT INTO public.food VALUES (99, 'Porción (s)', 1, 'Esparrago 50 grs', 0.0, 0.0, 0.0, 0.0, '2022-11-04 02:38:07.103781+00', '2022-11-04 02:38:07.103781+00');
INSERT INTO public.food VALUES (100, 'Porción (s)', 1, 'Espinaca 50 grs', 0.0, 0.0, 0.0, 0.0, '2022-11-04 02:38:18.679704+00', '2022-11-04 02:38:18.679704+00');
INSERT INTO public.food VALUES (101, 'Porción (s)', 1, 'lechuga 50 grs', 0.0, 0.0, 0.0, 0.0, '2022-11-04 02:38:28.822566+00', '2022-11-04 02:38:28.822566+00');
INSERT INTO public.food VALUES (102, 'Porción (s)', 1, 'Pepino cohombro 50 grs', 0.0, 0.0, 0.0, 0.0, '2022-11-04 02:39:11.144912+00', '2022-11-04 02:39:11.144912+00');
INSERT INTO public.food VALUES (103, 'Porción (s)', 1, 'Tomate 50 grs', 0.0, 0.0, 0.0, 0.0, '2022-11-04 02:39:22.433855+00', '2022-11-04 02:39:22.433855+00');
INSERT INTO public.food VALUES (104, 'Porción (s)', 1, 'cebolla 50 grs', 0.0, 0.0, 0.0, 0.0, '2022-11-04 02:39:30.728264+00', '2022-11-04 02:39:30.728264+00');
INSERT INTO public.food VALUES (105, 'Porción (s)', 1, 'remolacha 50 grs', 0.0, 0.0, 0.0, 0.0, '2022-11-04 02:41:45.655696+00', '2022-11-04 02:41:45.655696+00');
INSERT INTO public.food VALUES (106, 'Porción (s)', 1, 'Zanahoria 50 grs', 0.0, 0.0, 0.0, 0.0, '2022-11-04 03:02:51.903657+00', '2022-11-04 03:02:51.903657+00');
INSERT INTO public.food VALUES (107, 'Porción (s)', 1, 'vinagre una cuch 10 gr', 0.0, 0, 14, 126, '2022-11-04 03:03:49.955118+00', '2022-11-04 03:04:45.247348+00');
INSERT INTO public.food VALUES (108, 'Cucharadita. (s)', 1, 'mayonesa light  cuch 10 gr', 0.0, 1, 0.0, 4, '2022-11-04 03:05:43.294626+00', '2022-11-04 03:05:43.294626+00');
INSERT INTO public.food VALUES (109, 'Cucharadita. (s)', 1, 'aderezos ensaladas  cuch 10 gr', 0.0, 1, 3, 31, '2022-11-04 03:06:31.359198+00', '2022-11-04 03:06:31.359198+00');
INSERT INTO public.food VALUES (111, 'Unidad  (es)', 1, 'Durazno 50 g', 0.0, 0.0, 0.0, 0.0, '2022-11-04 03:08:58.234995+00', '2022-11-04 03:08:58.234995+00');
INSERT INTO public.food VALUES (112, 'Unidad  (es)', 1, 'Kiwi 50 g', 0.0, 0.0, 0.0, 0.0, '2022-11-04 03:09:21.910535+00', '2022-11-04 03:09:21.910535+00');
INSERT INTO public.food VALUES (110, 'Unidad  (es)', 1, 'Banano', 1.9000, 32.6000, 0.3200, 140.8800, '2022-11-04 03:08:32.224022+00', '2022-11-04 03:11:11.233618+00');
INSERT INTO public.food VALUES (113, 'Unidad (es)', 1, 'Mandarina 100 g', 0.0, 0.0, 0.0, 0.0, '2022-11-04 03:11:50.243005+00', '2022-11-04 03:11:50.243005+00');
INSERT INTO public.food VALUES (114, 'Unidad (es)', 1, 'Mango 100g', 0.0, 0.0, 0.0, 0.0, '2022-11-04 03:12:02.682896+00', '2022-11-04 03:12:02.682896+00');
INSERT INTO public.food VALUES (115, 'Unidad (es)', 1, 'Manzana 100 g', 0.0, 0.0, 0.0, 0.0, '2022-11-04 03:12:16.337142+00', '2022-11-04 03:12:16.337142+00');
INSERT INTO public.food VALUES (116, 'Unidad (es)', 1, 'Guayaba', 1.3500, 7.1000, 0.4200, 37.1800, '2022-11-04 03:13:07.603145+00', '2022-11-04 03:13:07.603145+00');
INSERT INTO public.food VALUES (117, 'Unidad (es)', 1, 'fresa', 0.7000, 6.7000, 0.6000, 35, '2022-11-04 03:13:54.247704+00', '2022-11-04 03:13:54.247704+00');
INSERT INTO public.food VALUES (118, 'Unidad (es)', 1, 'Papaya 100g', 0.4700, 10.8200, 0.2600, 47.5000, '2022-11-04 03:15:01.657302+00', '2022-11-04 03:15:01.657302+00');
INSERT INTO public.food VALUES (119, 'Unidad (es)', 1, 'melon 60 g', 0.8000, 6.5000, 0.2000, 31, '2022-11-04 03:16:46.017425+00', '2022-11-04 03:16:46.017425+00');
INSERT INTO public.food VALUES (120, 'Unidad (es)', 1, 'Piña 57g', 0.5000, 12, 0.2000, 51.8000, '2022-11-04 03:17:29.817234+00', '2022-11-04 03:17:29.817234+00');
INSERT INTO public.food VALUES (122, 'Unidad (es)', 1, 'Pera', 13.5000, 0.0, 0.0, 54, '2022-11-04 03:24:23.766503+00', '2022-11-04 03:24:23.766503+00');
INSERT INTO public.food VALUES (123, 'Scoop', 1, 'Megaplex Creatine Power', 6, 32, 0.0, 152, '2022-11-04 03:28:02.129154+00', '2022-11-04 03:28:02.129154+00');
INSERT INTO public.food VALUES (124, 'Scoop', 1, 'Megaplex Mass', 9, 33, 1, 177, '2022-11-04 03:28:44.599741+00', '2022-11-04 03:28:44.599741+00');
INSERT INTO public.food VALUES (125, 'Scoop', 1, 'Bipro', 22, 0.0, 0.0, 88, '2022-11-04 03:29:37.112683+00', '2022-11-04 03:29:37.112683+00');
INSERT INTO public.food VALUES (126, 'Scoop', 1, 'Mega whey', 19.5000, 10, 1, 125, '2022-11-04 03:40:37.723076+00', '2022-11-04 03:40:37.723076+00');
INSERT INTO public.food VALUES (127, 'Scoop', 1, 'Mega Pure', 20, 1, 0.5000, 90, '2022-11-04 03:41:19.557719+00', '2022-11-04 03:41:19.557719+00');
INSERT INTO public.food VALUES (128, 'Scoop', 1, 'Mega soy', 22.5000, 0.0, 0.0, 90, '2022-11-04 03:42:25.372869+00', '2022-11-04 03:42:25.372869+00');
INSERT INTO public.food VALUES (129, 'Scoop', 1, 'Megaplex lite', 12.5000, 12.5000, 0.0, 100, '2022-11-04 03:47:41.27915+00', '2022-11-04 03:47:41.27915+00');
INSERT INTO public.food VALUES (130, 'Scoop', 1, 'Mega carbs', 0.0, 38, 0.0, 152, '2022-11-04 03:49:02.188481+00', '2022-11-04 03:49:02.188481+00');
INSERT INTO public.food VALUES (132, 'Scoop', 1, 'Recov', 7, 25, 0.0, 128, '2022-11-04 03:51:43.328084+00', '2022-11-04 03:52:28.825881+00');
INSERT INTO public.food VALUES (131, 'Scoop', 1, 'Nitro SS', 0.0, 29, 0.0, 130, '2022-11-04 03:50:58.985214+00', '2022-11-04 03:52:51.121124+00');
INSERT INTO public.food VALUES (134, 'un scoop y un cuarto', 1, 'Nut Rx', 9, 35, 9, 260, '2022-11-04 03:56:59.271701+00', '2022-11-04 03:56:59.271701+00');
INSERT INTO public.food VALUES (135, 'un Scoop y medio', 1, 'Nut Rx Kits', 6, 22, 10, 200, '2022-11-04 03:57:49.144818+00', '2022-11-04 03:57:49.144818+00');
INSERT INTO public.food VALUES (136, 'Scoop', 1, 'zole', 9, 13, 6, 140, '2022-11-04 04:10:48.84142+00', '2022-11-04 04:10:48.84142+00');
INSERT INTO public.food VALUES (137, 'Scoop', 1, 'Mega cell NO2', 0.0, 25, 0.0, 100, '2022-11-04 04:11:36.299752+00', '2022-11-04 04:11:36.299752+00');
INSERT INTO public.food VALUES (138, 'Scoop', 1, 'Eca factor', 0.0, 0.0, 0.0, 0.0, '2022-11-04 04:12:08.353026+00', '2022-11-04 04:12:08.353026+00');
INSERT INTO public.food VALUES (139, 'Porción', 1, 'Arepa antioqueña', 5, 36, 0.0, 164, '2022-11-04 04:13:06.475704+00', '2022-11-04 04:13:06.475704+00');
INSERT INTO public.food VALUES (140, 'Porción', 1, 'Pan bimbo (2rebanadas)', 6, 21, 1.5000, 121.5000, '2022-11-04 04:14:07.263245+00', '2022-11-04 04:14:07.263245+00');
INSERT INTO public.food VALUES (141, 'Gramos', 1, 'Carne de lomo viche o pechuga de pollo o pavo', 0.2100, 0.0, 0.0500, 1.2900, '2022-11-04 04:15:28.892536+00', '2022-11-04 04:15:28.892536+00');
INSERT INTO public.food VALUES (142, 'Capsula (s)', 1, 'L-CARNITINA', 0.0, 0.0, 0.0, 0.0, '2022-11-04 04:17:45.368917+00', '2022-11-04 04:17:45.368917+00');
INSERT INTO public.food VALUES (143, 'Capsula (s)', 1, 'BCAA´S', 0.0, 0.0, 0.0, 0.0, '2022-11-04 04:18:03.158423+00', '2022-11-04 04:18:03.158423+00');
INSERT INTO public.food VALUES (144, 'Porción (es)', 1, 'Ensalada', 0.0, 20, 5, 125, '2022-11-04 04:23:37.914697+00', '2022-11-04 04:23:37.914697+00');
INSERT INTO public.food VALUES (145, 'Tableta (s)', 1, 'PICOLINATO DE CHROMIUM', 0.0, 0.0, 0.0, 0.0, '2022-11-04 04:25:09.074432+00', '2022-11-04 04:25:09.074432+00');
INSERT INTO public.food VALUES (146, 'Medida (s)', 1, 'Creatina 5g', 0.0, 0.0, 0.0, 0.0, '2022-11-04 04:26:58.771142+00', '2022-11-04 04:26:58.771142+00');
INSERT INTO public.food VALUES (147, 'Medida (s)', 1, 'Glutamina 5g', 0.0, 0.0, 0.0, 0.0, '2022-11-04 04:27:12.194686+00', '2022-11-04 04:27:12.194686+00');
INSERT INTO public.food VALUES (148, 'Tableta (s)', 1, 'Eca factor', 0.0, 0.0, 0.0, 0.0, '2022-11-04 04:27:36.857202+00', '2022-11-04 04:27:36.857202+00');
INSERT INTO public.food VALUES (149, 'Tableta (s)', 1, 'OXAPLEX', 0.0, 0.0, 0.0, 0.0, '2022-11-04 04:27:47.825205+00', '2022-11-04 04:27:47.825205+00');
INSERT INTO public.food VALUES (150, 'Tableta (s)', 1, 'OXAPLEX', 0.0, 0.0, 0.0, 0.0, '2022-11-04 21:10:20.088192+00', '2022-11-04 21:10:20.088192+00');
INSERT INTO public.food VALUES (151, 'Scoop', 1, 'RECOV', 6.6900, 25, 0.3000, 0.3000, '2022-11-04 21:11:12.148175+00', '2022-11-04 21:11:12.148175+00');
INSERT INTO public.food VALUES (152, 'Sobre(s)', 1, 'Mega Energy', 0.0, 4, 0.0, 16, '2022-11-04 21:12:35.998734+00', '2022-11-04 21:12:35.998734+00');
INSERT INTO public.food VALUES (153, 'Scoop', 1, 'Megaplex Tech', 18, 8.6500, 0.6900, 112.9300, '2022-11-04 21:16:23.432226+00', '2022-11-04 21:16:23.432226+00');
INSERT INTO public.food VALUES (154, 'Torta', 1, 'Protein Cake', 20, 40, 7, 300, '2022-11-04 21:19:05.992913+00', '2022-11-04 21:19:05.992913+00');
INSERT INTO public.food VALUES (155, 'vaso', 1, 'Agua o bebida light', 0.0, 0.0, 0.0, 0.0, '2022-11-04 21:19:43.420069+00', '2022-11-04 21:19:43.420069+00');
INSERT INTO public.food VALUES (156, 'vaso', 1, 'Yogur griego', 9, 0.0, 0.0, 36, '2022-11-04 21:20:12.587557+00', '2022-11-04 21:20:12.587557+00');
INSERT INTO public.food VALUES (157, 'CAPSULA', 1, 'OXABURNER', 0.0, 0.0, 0.0, 0.0, '2022-11-04 21:21:11.327665+00', '2022-11-04 21:21:11.327665+00');
INSERT INTO public.food VALUES (158, 'Scoop', 1, 'Nitro shock- BCAA', 0.0, 0.0, 0.0, 0.0, '2022-11-04 21:55:52.845043+00', '2022-11-04 21:55:52.845043+00');
INSERT INTO public.food VALUES (159, 'Capsulas', 1, 'METAPLEX', 0.0, 0.0, 0.0, 0.0, '2022-11-04 21:56:21.405799+00', '2022-11-04 21:56:21.405799+00');
INSERT INTO public.food VALUES (160, 'Capsula (s)', 1, 'STAPLEX', 0.0, 0.0, 0.0, 0.0, '2022-11-04 21:57:07.947368+00', '2022-11-04 21:57:07.947368+00');
INSERT INTO public.food VALUES (161, 'Capsula (s)', 1, 'WINABOL', 0.0, 0.0, 0.0, 0.0, '2022-11-04 21:57:18.704423+00', '2022-11-04 21:57:18.704423+00');
INSERT INTO public.food VALUES (162, 'Capsula (s)', 1, 'METENOLONA', 0.0, 0.0, 0.0, 0.0, '2022-11-04 21:57:42.334809+00', '2022-11-04 21:57:42.334809+00');
INSERT INTO public.food VALUES (163, 'GRAMOS', 1, 'Claras de huevo', 11.1000, 0.7000, 0.2000, 49, '2022-11-04 21:59:47.939726+00', '2022-11-04 21:59:47.939726+00');
INSERT INTO public.food VALUES (164, 'Porción (es)', 1, 'Atún con verduras en lata', 14, 12, 2, 122, '2022-11-04 22:00:34.923115+00', '2022-11-04 22:00:34.923115+00');
INSERT INTO public.food VALUES (165, 'Gramos', 1, 'Carne magra, pechuga de pollo sin piel o pescado', 0.2000, 0.0, 0.0600, 854, '2022-11-04 22:01:34.729519+00', '2022-11-04 22:01:34.729519+00');
INSERT INTO public.food VALUES (166, 'Sandwich', 1, '2 reb pan integral, 100 gr pechuga o carne y verduras.', 25.5000, 20, 4, 218, '2022-11-04 22:02:43.415716+00', '2022-11-04 22:02:43.415716+00');
INSERT INTO public.food VALUES (167, 'CAPSULA(S)', 1, 'HYPERCUT', 0.0, 0.0, 0.0, 0.0, '2022-11-04 22:03:19.252751+00', '2022-11-04 22:03:19.252751+00');
INSERT INTO public.food VALUES (168, 'Scoop', 1, 'ENERGY SHOCK', 3.5000, 0.5000, 0.0, 16, '2022-11-04 22:06:14.584721+00', '2022-11-04 22:06:14.584721+00');


--
-- Data for Name: food_category; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO public.food_category VALUES (1, 'BEBIDA', '2022-10-18 21:40:20.183532+00', '2022-10-19 20:56:34.070846+00');
INSERT INTO public.food_category VALUES (2, 'Carbohidrato', '2022-10-18 21:40:24.477073+00', '2022-11-02 19:50:07.005168+00');
INSERT INTO public.food_category VALUES (3, 'quesos', '2022-10-18 21:40:26.387253+00', '2022-11-02 19:50:26.815946+00');
INSERT INTO public.food_category VALUES (5, 'Modulos proteicos', '2022-10-18 21:41:50.587672+00', '2022-11-02 19:51:20.169778+00');
INSERT INTO public.food_category VALUES (26, 'varios', '2022-11-02 19:52:05.173841+00', '2022-11-02 19:52:05.173841+00');
INSERT INTO public.food_category VALUES (27, 'verduras', '2022-11-02 19:52:34.736837+00', '2022-11-02 19:52:34.736837+00');
INSERT INTO public.food_category VALUES (28, 'frutas', '2022-11-02 19:53:04.291656+00', '2022-11-02 19:53:04.291656+00');
INSERT INTO public.food_category VALUES (29, 'UPN Hipercaloricos', '2022-11-02 19:53:33.243687+00', '2022-11-02 19:53:33.243687+00');
INSERT INTO public.food_category VALUES (30, 'UPN Proteicos', '2022-11-02 19:53:51.482547+00', '2022-11-02 19:53:51.482547+00');
INSERT INTO public.food_category VALUES (31, 'UPN Perdida de peso', '2022-11-02 19:54:15.275014+00', '2022-11-02 19:54:15.275014+00');
INSERT INTO public.food_category VALUES (32, 'UPN energia e hidratacion', '2022-11-02 19:54:44.132283+00', '2022-11-02 19:54:44.132283+00');
INSERT INTO public.food_category VALUES (33, 'UPN Nutricion general', '2022-11-02 19:55:20.854042+00', '2022-11-02 19:55:20.854042+00');
INSERT INTO public.food_category VALUES (34, 'Promedio carnes', '2022-11-02 19:55:41.212102+00', '2022-11-02 19:55:41.212102+00');
INSERT INTO public.food_category VALUES (35, 'Promedio verduras', '2022-11-02 19:55:53.049964+00', '2022-11-02 19:55:53.049964+00');
INSERT INTO public.food_category VALUES (36, 'Aminoacios y minerales', '2022-11-02 19:56:18.351106+00', '2022-11-02 19:56:18.351106+00');
INSERT INTO public.food_category VALUES (37, 'Modulos Proteicos', '2022-11-02 19:56:40.941186+00', '2022-11-02 19:56:40.941186+00');
INSERT INTO public.food_category VALUES (38, 'Snack', '2022-11-02 19:57:02.517927+00', '2022-11-02 19:57:02.517927+00');


--
-- Data for Name: food_has_eating_moment; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO public.food_has_eating_moment VALUES (1, 1, '2022-10-19 19:25:09.16261+00', '2022-10-19 19:14:00.695592+00', 1);


--
-- Data for Name: food_has_food_category; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO public.food_has_food_category VALUES (1, 1, '2022-10-19 19:14:12.210541+00', '2022-10-19 19:14:12.210541+00', 1);


--
-- Data for Name: nutritionist; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO public.nutritionist VALUES (1, 'Wilson', 'Rave', 'WILRAVEC18@GMAIL.COM ', '+573003676929', 'Bello, Cabañas', '2022-10-19 19:34:44.586159+00', '2022-10-19 20:21:58.2266+00', NULL);


--
-- Name: eating_moment_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.eating_moment_id_seq', 51, true);


--
-- Name: food_category_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.food_category_id_seq', 38, true);


--
-- Name: food_has_eating_moment_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.food_has_eating_moment_id_seq', 33, true);


--
-- Name: food_has_food_category_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.food_has_food_category_id_seq', 33, true);


--
-- Name: food_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.food_id_seq', 168, true);


--
-- Name: goal_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.goal_id_seq', 33, true);


--
-- Name: measurement_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.measurement_id_seq', 43, true);


--
-- Name: nutritionist_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.nutritionist_id_seq', 33, true);


--
-- Name: plan_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.plan_id_seq', 33, true);


--
-- Name: prescribed_food_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.prescribed_food_id_seq', 33, true);


--
-- Name: user_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.user_id_seq', 159, true);


ALTER TABLE ONLY public.eating_moment
    ADD CONSTRAINT eating_moment_pkey PRIMARY KEY (id);


--
-- Name: food_category food_category_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.food_category
    ADD CONSTRAINT food_category_pkey PRIMARY KEY (id);


--
-- Name: food_has_eating_moment food_has_eating_moment_id_key; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.food_has_eating_moment
    ADD CONSTRAINT food_has_eating_moment_id_key UNIQUE (id);


--
-- Name: food_has_eating_moment food_has_eating_moment_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.food_has_eating_moment
    ADD CONSTRAINT food_has_eating_moment_pkey PRIMARY KEY (food_id, eating_moment_id);


--
-- Name: food_has_food_category food_has_food_category_id_key; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.food_has_food_category
    ADD CONSTRAINT food_has_food_category_id_key UNIQUE (id);


--
-- Name: food_has_food_category food_hs_food_category_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.food_has_food_category
    ADD CONSTRAINT food_hs_food_category_pkey PRIMARY KEY (food_id, food_category_id);


--
-- Name: food food_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.food
    ADD CONSTRAINT food_pkey PRIMARY KEY (id);


--
-- Name: goal goal_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.goal
    ADD CONSTRAINT goal_pkey PRIMARY KEY (id);


--
-- Name: measurement measurement_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.measurement
    ADD CONSTRAINT measurement_pkey PRIMARY KEY (id);


--
-- Name: nutritionist nutritionist_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.nutritionist
    ADD CONSTRAINT nutritionist_pkey PRIMARY KEY (id);


--
-- Name: plan plan_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.plan
    ADD CONSTRAINT plan_pkey PRIMARY KEY (id);


--
-- Name: prescribed_food prescribed_food_id_key; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.prescribed_food
    ADD CONSTRAINT prescribed_food_id_key UNIQUE (id);


--
-- Name: prescribed_food prescribed_food_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.prescribed_food
    ADD CONSTRAINT prescribed_food_pkey PRIMARY KEY (food_id);


--
-- Name: user user_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."user"
    ADD CONSTRAINT user_pkey PRIMARY KEY (id);


ALTER TABLE ONLY public.food_has_eating_moment
    ADD CONSTRAINT food_has_eating_moment_eating_moment_id_fkey FOREIGN KEY (eating_moment_id) REFERENCES public.eating_moment(id) ON UPDATE RESTRICT ON DELETE RESTRICT;


--
-- Name: food_has_eating_moment food_has_eating_moment_food_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.food_has_eating_moment
    ADD CONSTRAINT food_has_eating_moment_food_id_fkey FOREIGN KEY (food_id) REFERENCES public.food(id) ON UPDATE RESTRICT ON DELETE RESTRICT;


--
-- Name: food_has_food_category food_hs_food_category_food_category_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.food_has_food_category
    ADD CONSTRAINT food_hs_food_category_food_category_id_fkey FOREIGN KEY (food_category_id) REFERENCES public.food_category(id) ON UPDATE RESTRICT ON DELETE RESTRICT;


--
-- Name: food_has_food_category food_hs_food_category_food_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.food_has_food_category
    ADD CONSTRAINT food_hs_food_category_food_id_fkey FOREIGN KEY (food_id) REFERENCES public.food(id) ON UPDATE RESTRICT ON DELETE RESTRICT;


--
-- Name: measurement measurement_user_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.measurement
    ADD CONSTRAINT measurement_user_id_fkey FOREIGN KEY (user_id) REFERENCES public."user"(id) ON UPDATE RESTRICT ON DELETE RESTRICT;


--
-- Name: plan plan_goal_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.plan
    ADD CONSTRAINT plan_goal_id_fkey FOREIGN KEY (goal_id) REFERENCES public.goal(id) ON UPDATE RESTRICT ON DELETE RESTRICT;


--
-- Name: plan plan_nutritionist_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.plan
    ADD CONSTRAINT plan_nutritionist_id_fkey FOREIGN KEY (nutritionist_id) REFERENCES public.nutritionist(id) ON UPDATE RESTRICT ON DELETE RESTRICT;


--
-- Name: plan plan_user_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.plan
    ADD CONSTRAINT plan_user_id_fkey FOREIGN KEY (user_id) REFERENCES public."user"(id) ON UPDATE RESTRICT ON DELETE RESTRICT;


--
-- Name: prescribed_food prescribed_food_food_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.prescribed_food
    ADD CONSTRAINT prescribed_food_food_id_fkey FOREIGN KEY (food_id) REFERENCES public.food(id) ON UPDATE RESTRICT ON DELETE RESTRICT;


--
-- Name: prescribed_food prescribed_food_plan_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.prescribed_food
    ADD CONSTRAINT prescribed_food_plan_id_fkey FOREIGN KEY (plan_id) REFERENCES public.plan(id) ON UPDATE RESTRICT ON DELETE RESTRICT;


--
-- PostgreSQL database dump complete
--

--
-- PostgreSQL database cluster dump complete
--

