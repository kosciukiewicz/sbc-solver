import { ClubPlayerCard, SolverSolution } from "../data/interfaces";

const delay = (ms: number) => new Promise((res) => setTimeout(res, ms));

const triggerMouseEvent = (node: Node, eventType: string) => {
  const clickEvent = document.createEvent("MouseEvents");
  clickEvent.initEvent(eventType, true, true);
  node.dispatchEvent(clickEvent);
};

const clickOnElement = (slotNode: Node) => {
  triggerMouseEvent(slotNode, "mouseover");
  triggerMouseEvent(slotNode, "mousedown");
  triggerMouseEvent(slotNode, "mouseup");
  triggerMouseEvent(slotNode, "click");
};

const getSingleElementByXpath = (xpath: string): Node | null => {
  return document.evaluate(
    xpath,
    document,
    null,
    XPathResult.FIRST_ORDERED_NODE_TYPE,
    null,
  ).singleNodeValue as HTMLElement;
};

async function setPlayer(
  slot_element: HTMLElement,
  player_card: ClubPlayerCard,
) {
  console.log(slot_element);
  console.log(player_card);

  clickOnElement(slot_element);

  const add_player_button: Node | null = getSingleElementByXpath(
    "//span[contains(text(),'Add Player')]",
  );

  if (!add_player_button) {
    return;
  }

  await delay(100);
  clickOnElement(add_player_button);

  const player_name_input = getSingleElementByXpath(
    "//input[@placeholder='Type Player Name']",
  ) as HTMLInputElement;

  if (!player_name_input) {
    return;
  }

  player_name_input.value = player_card["name"];
  player_name_input.dispatchEvent(new Event("input"));
  await delay(500);

  const player_search_item = getSingleElementByXpath(
    "//span[contains(text(),'" + player_card["name"] + "')]",
  );

  if (!player_search_item) {
    return;
  }

  clickOnElement(player_search_item);
  await delay(200);

  const player_search_position_filter = getSingleElementByXpath(
    "(//button[@class='flat ut-search-filter-control--row-button'])[4]",
  );
  clickOnElement(player_search_position_filter!);
  await delay(100);

  const player_search_button_search = getSingleElementByXpath(
    "//button[contains(text(),'Search')]",
  );
  clickOnElement(player_search_button_search!);
  await delay(400);

  const button_add_player = getSingleElementByXpath(
    "//button[@class='ut-image-button-control btnAction add']",
  );

  if (button_add_player) {
    clickOnElement(button_add_player);
  }

  await delay(100);
}

export async function solve(solution: SolverSolution) {
  let index = 0;
  const player_slots_elements =
    document.getElementsByClassName("ut-squad-slot-view");

  for (
    let slot_index = 0;
    slot_index < player_slots_elements.length;
    slot_index++
  ) {
    const player_slot_element = player_slots_elements[slot_index];
    console.log(player_slot_element["className"]);

    if (
      !player_slot_element["className"].includes("locked") &&
      index < solution.player_cards.length
    ) {
      await delay(100);
      await setPlayer(
        player_slot_element as HTMLElement,
        solution.player_cards[index],
      );
      index += 1;
    }
  }
}
